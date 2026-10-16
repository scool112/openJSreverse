from curl_cffi import requests
import sys
import os
import subprocess
import json
import uuid
import time

sess = requests.Session()
bashpath = os.path.dirname(os.path.abspath(__file__))

""" ============== 第一次请求 ============== """
headers1 = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "dnt": "1",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-gpc": "1"
}
url1 = 'https://www.delta.com'
response = sess.get(url1, headers=headers1,impersonate="chrome110")


""" ============== 第二次请求 ============== """
headers2 = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://www.delta.com/",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "dnt": "1",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-gpc": "1"
}
url2 = 'https://www.delta.com/cn/zh'
response2 = sess.get(url2, headers=headers2,impersonate="chrome110")


""" ============== 第三次请求 ============== """
url3 = 'https://www.delta.com'  + response2.text.split('src="')[10].split('"><')[0]
headers3 = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "text/plain;charset=UTF-8",
    "Origin": "https://www.delta.com/",
    "Pragma": "no-cache",
    "Referer": "https://www.delta.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "dnt": "1",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-gpc": "1"
}
response3 = sess.get(url3, headers=headers3,impersonate="chrome110")
with open(os.path.join(bashpath,"..",'jscode','jscode.js'),'wb') as f:
    f.write(response3.content)
    print("写入成功")

""" ============== 得到sensor_data ============== """
bm_sz = "bm_sz=" + sess.cookies.get_dict()['bm_sz']
process_sensor_data = subprocess.run(
    ["node", os.path.join(bashpath, "..", 'jscode', 'index.js'),bm_sz],
    cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
)
if process_sensor_data.returncode != 0 or not process_sensor_data.stdout.strip():
    print("node 失败:", process_sensor_data.stderr[-1500:])
    print("node stdout:", process_sensor_data.stdout[-3000:])
    sys.exit(1)
sensor_data = json.loads(process_sensor_data.stdout.strip().splitlines()[-1])
data = {
    "sensor_data":sensor_data['sensor_data']
}

""" ============== 第四次次请求 ============== """
response4 = sess.post(url3, headers=headers3,data=json.dumps(data), impersonate="chrome110")


""" ============== 第五次次请求 ============== """
cacheKeySuffix = str(uuid.uuid4())
headers5 = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "dnt": "1",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "referer": "https://www.delta.com/cn/zh",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "sec-gpc": "1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
}
url5 = 'https://www.delta.com/flightsearch/search-results'
params5 = {"cacheKeySuffix":cacheKeySuffix}
response5 = sess.get(url5, headers=headers5,params=params5, impersonate="chrome110")
print(response5.text)

for i in range(10):
    """ ============== 第六次次请求 ============== """
    url6 = "https://www.delta.com" + response5.text.split('src="')[4].split('"></')[0]
    headers6 = {
        "Accept": "*/*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "text/plain;charset=UTF-8",
        "Origin": "https://www.delta.com",
        "Pragma": "no-cache",
        "Referer": "https://www.delta.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "dnt": "1",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-gpc": "1"
    }
    response6 = sess.get(url6, headers=headers6,impersonate="chrome110")
    with open(os.path.join(bashpath,"..",'jscode','jscode.js'),'wb') as f:
        f.write(response6.content)
        print("第二次写入成功")

    """ ============== 得到sensor_data ============== """
    bm_sz = "bm_sz=" + sess.cookies.get_dict()['bm_sz']
    process_sensor_data = subprocess.run(
        ["node", os.path.join(bashpath, "..", 'jscode', 'index.js'),bm_sz],
        cwd=os.path.join(bashpath, '..', 'jscode'), capture_output=True, text=True, encoding="utf-8", timeout=90,
    )
    if process_sensor_data.returncode != 0 or not process_sensor_data.stdout.strip():
        print("node 失败:", process_sensor_data.stderr[-1500:])
        print("node stdout:", process_sensor_data.stdout[-3000:])
        sys.exit(1)
    sensor_data = json.loads(process_sensor_data.stdout.strip().splitlines()[-1])
    data = {
        "sensor_data":sensor_data['sensor_data']
    }

    """ ============== 第七次次请求 ============== """
    response7 = sess.post(url6, headers=headers6,data=json.dumps(data), impersonate="chrome110")
    if (sess.cookies.get_dict()["_abck"].split('~')[1].split('~')[0] == "0"):
        break


# """ ============== 最终次请求 ============== """
url8 = 'https://offer-api-prd.delta.com/prd/rm-offer-gql'
headers8 = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "airline": "DL",
    "applicationid": "DC",
    "authorization": "GUEST",
    "cache-control": "no-cache",
    "channelid": "DCOM",
    "content-type": "application/json",
    "dnt": "1",
    "origin": "https://www.delta.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.delta.com/",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "sec-gpc": "1",
    "transactionid": cacheKeySuffix + "_" + str(   int(  time.time()*1000)  )   ,
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "x-app-route": "search",
    "x-app-type": "dcom-shop"
}
data8 = {
    "variables": {
        "offerSearchCriteria": {
            "productGroups": [
                {
                    "productCategoryCode": "FLIGHTS"
                }
            ],
            "offersCriteria": {
                "resultsPageNum": 1,
                "resultsPerRequestNum": 20,
                "preferences": {
                    "refundableOnly": False,
                    "showGlobalRegionalUpgradeCertificate": True,
                    "nonStopOnly": False,
                    "excludeBrandTypes": []
                },
                "pricingCriteria": {
                    "priceableIn": [
                        "CURRENCY"
                    ]
                },
                "flightRequestCriteria": {
                    "currentTripIndexId": "0",
                    "sortableOptionId": None,
                    "selectedOfferId": "",
                    "searchOriginDestination": [
                        {
                            "departureLocalTs": "2026-12-18T00:00:00",
                            "destinations": [
                                {
                                    "airportCode": "JFK"
                                }
                            ],
                            "origins": [
                                {
                                    "airportCode": "SIN"
                                }
                            ]
                        }
                    ],
                    "sortByBrandId": "MAIN",
                    "additionalCriteriaMap": {
                        "rollOutTag": "GBB"
                    }
                }
            },
            "customers": [
                {
                    "passengerTypeCode": "ADT",
                    "passengerId": "1"
                }
            ]
        }
    },
    "query": "query ($offerSearchCriteria: OfferSearchCriteriaInput!) {\n  gqlSearchOffers(offerSearchCriteria: $offerSearchCriteria) {\n    offerResponseId\n    gqlOffersSets {\n      trips {\n        tripId\n        scheduledDepartureLocalTs\n        scheduledArrivalLocalTs\n        originAirportCode\n        destinationAirportCode\n        stopCnt\n        flightSegment {\n          aircraftTypeCode\n          dayChange\n          destinationAirportCode\n          flightLeg {\n            legId\n            dayChange\n            destinationAirportCode\n            feeRestricted\n            scheduledArrivalLocalTs\n            scheduledDepartureLocalTs\n            layover {\n              destinationAirportCode\n              layoverAirportCode\n              layoverDuration {\n                hourCnt\n                minuteCnt\n              }\n              departureFlightNum\n              equipmentChange\n              originAirportCode\n              scheduledArrivalLocalTs\n              scheduledDepartureLocalTs\n            }\n            operatedByOwnerCarrier\n            redEye\n            operatingCarrier {\n              carrierCode\n              carrierName\n            }\n            marketingCarrier {\n              carrierCode\n              carrierName\n            }\n            earnLoyaltyMiles\n            loyaltyMemberBenefits\n            dominantLeg\n            duration {\n              dayCnt\n              hourCnt\n              minuteCnt\n            }\n            originAirport {\n              airportTerminals {\n                terminalId\n              }\n            }\n            destinationAirport {\n              airportTerminals {\n                terminalId\n              }\n            }\n            originAirportCode\n            aircraft {\n              fleetTypeCode\n              subFleetTypeCode\n              newSubFleetType\n            }\n            carrierCode\n            distance {\n              unitOfMeasure\n              unitOfMeasureCnt\n            }\n          }\n          layover {\n            destinationAirportCode\n            layoverAirportCode\n            layoverDuration {\n              hourCnt\n              minuteCnt\n            }\n            departureFlightNum\n            equipmentChange\n            originAirportCode\n            scheduledArrivalLocalTs\n            scheduledDepartureLocalTs\n          }\n          marketingCarrier {\n            carrierCode\n            carrierNum\n          }\n          operatingCarrier {\n            carrierCode\n            carrierNum\n            carrierName\n          }\n          pendingGovtApproval\n          destinationCityCode\n          flightSegmentNum\n          originAirportCode\n          originCityCode\n          scheduledArrivalLocalTs\n          scheduledDepartureLocalTs\n          aircraft {\n            fleetTypeCode\n            subFleetTypeCode\n            newSubFleetType\n          }\n        }\n        totalTripTime {\n          dayCnt\n          hourCnt\n          minuteCnt\n        }\n        summarizedProductId\n      }\n      additionalOfferSetProperties {\n        globalUpgradeCertificateTripStatus {\n          brandId\n          upgradeAvailableStatusProductId\n        }\n        regionalUpgradeCertificateTripStatus {\n          brandId\n          upgradeAvailableStatusProductId\n        }\n        offerSetId\n        seatReferenceId\n        discountInfo {\n          discountPct\n          discountTypeCode\n          nonDiscountedOffersAvailable\n        }\n        promotionsInfo {\n          promotionalCode\n          promotionalPct\n        }\n        discountInEligibilityList {\n          code\n          reason\n        }\n      }\n      offerSetBadges {\n        brandId\n      }\n      offers {\n        offerId\n        additionalOfferProperties {\n          offered\n          lowestFareByBrand\n          offerPriorityNum\n          fareType\n          dominantSegmentBrandId\n          priorityNum\n          soldOut\n          unavailableForSale\n          refundable\n          offerBadges {\n            brandId\n          }\n          payWithMilesEligible\n          discountAvailable\n          travelPolicyStatus\n          secondarySolutionRefIds\n        }\n        soldOut\n        offerItems {\n          retailItems {\n            retailItemMetaData {\n              fareInformation {\n                solutionId\n                ticketDesignatorCode\n                brandByFlightLegs {\n                  brandId\n                  cosCode\n                  tripId\n                  product {\n                    brandId\n                    typeCode\n                  }\n                  globalUpgradeCertificateLegStatus {\n                    upgradeAvailableStatusProductId\n                  }\n                  regionalUpgradeCertificateLegStatus {\n                    upgradeAvailableStatusProductId\n                  }\n                  flightSegmentNum\n                  flightLegNum\n                }\n                discountInEligibilityList {\n                  code\n                  reason\n                }\n                availableSeatCnt\n                farePrice {\n                  discountsApplied {\n                    pct\n                    code\n                    description\n                    reason\n                    amount {\n                      currencyEquivalentPrice {\n                        currencyAmt\n                      }\n                      milesEquivalentPrice {\n                        mileCnt\n                        discountMileCnt\n                      }\n                    }\n                  }\n                  totalFarePrice {\n                    currencyEquivalentPrice {\n                      roundedCurrencyAmt\n                      formattedCurrencyAmt\n                    }\n                    milesEquivalentPrice {\n                      mileCnt\n                      cashPlusMilesCnt\n                      cashPlusMiles\n                    }\n                  }\n                  originalTotalPrice {\n                    currencyEquivalentPrice {\n                      roundedCurrencyAmt\n                      formattedCurrencyAmt\n                    }\n                    milesEquivalentPrice {\n                      mileCnt\n                      cashPlusMilesCnt\n                      cashPlusMiles\n                    }\n                  }\n                  promotionalPrices {\n                    price {\n                      currencyEquivalentPrice {\n                        roundedCurrencyAmt\n                        formattedCurrencyAmt\n                      }\n                      milesEquivalentPrice {\n                        mileCnt\n                        cashPlusMilesCnt\n                        cashPlusMiles\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n    offerDataList {\n      responseProperties {\n        discountInfo {\n          discountPct\n          discountTypeCode\n          nonDiscountedOffersAvailable\n        }\n        promotionsInfo {\n          promotionalCode\n          promotionalPct\n        }\n        discountInEligibilityList {\n          code\n          reason\n        }\n        resultsPerRequestNum\n        pageResultCnt\n        resultsPageNum\n        sortOptionsList {\n          sortableOptionDesc\n          sortableOptionId\n        }\n        tripTypeText\n      }\n      offerPreferences {\n        stopCnt\n        destinationAirportCode\n        connectionTimeRange {\n          maximumNum\n          minimumNum\n        }\n        originAirportCode\n        flightDurationRange {\n          maximumNum\n          minimumNum\n        }\n        layoverAirportCode\n        totalMilesRange {\n          maximumNum\n          minimumNum\n        }\n        totalPriceRange {\n          maximumNum\n          minimumNum\n        }\n      }\n      retailItemDefinitionList {\n        brandType\n        retailItemBrandId\n        refundable\n        retailItemPriorityText\n      }\n      pricingOptions {\n        pricingOptionDetail {\n          currencyCode\n        }\n      }\n    }\n    gqlSelectedOfferSets {\n      trips {\n        tripId\n        scheduledDepartureLocalTs\n        scheduledArrivalLocalTs\n        originAirportCode\n        destinationAirportCode\n        stopCnt\n        flightSegment {\n          destinationAirportCode\n          marketingCarrier {\n            carrierCode\n            carrierNum\n          }\n          operatingCarrier {\n            carrierCode\n            carrierNum\n          }\n          flightSegmentNum\n          originAirportCode\n          scheduledArrivalLocalTs\n          scheduledDepartureLocalTs\n          aircraft {\n            fleetTypeCode\n            subFleetTypeCode\n            newSubFleetType\n          }\n          flightLeg {\n            destinationAirportCode\n            feeRestricted\n            layover {\n              destinationAirportCode\n              layoverAirportCode\n              layoverDuration {\n                hourCnt\n                minuteCnt\n              }\n              departureFlightNum\n              equipmentChange\n              originAirportCode\n              scheduledArrivalLocalTs\n              scheduledDepartureLocalTs\n            }\n            operatedByOwnerCarrier\n            redEye\n            operatingCarrier {\n              carrierCode\n              carrierName\n            }\n            marketingCarrier {\n              carrierCode\n              carrierName\n            }\n            earnLoyaltyMiles\n            loyaltyMemberBenefits\n            dominantLeg\n            duration {\n              dayCnt\n              hourCnt\n              minuteCnt\n            }\n            originAirport {\n              airportTerminals {\n                terminalId\n              }\n            }\n            destinationAirport {\n              airportTerminals {\n                terminalId\n              }\n            }\n            originAirportCode\n            aircraft {\n              fleetTypeCode\n              subFleetTypeCode\n              newSubFleetType\n            }\n            carrierCode\n            distance {\n              unitOfMeasure\n              unitOfMeasureCnt\n            }\n            scheduledArrivalLocalTs\n            scheduledDepartureLocalTs\n            dayChange\n            legId\n          }\n        }\n        totalTripTime {\n          dayCnt\n          hourCnt\n          minuteCnt\n        }\n      }\n      offers {\n        additionalOfferProperties {\n          dominantSegmentBrandId\n          fareType\n        }\n        soldOut\n        offerItems {\n          retailItems {\n            retailItemMetaData {\n              fareInformation {\n                brandByFlightLegs {\n                  tripId\n                  brandId\n                  cosCode\n                }\n              }\n            }\n          }\n        }\n      }\n      additionalOfferSetProperties {\n        seatReferenceId\n      }\n    }\n  }\n}"
}
response9 = sess.post(url8, headers=headers8,json=data8, impersonate="chrome110")
print(response9.text)
print(response9.status_code)


