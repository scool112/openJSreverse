from spider1 import spider1
from spider2 import spider2
from spider3 import spider3
from trajectory import TPmain

Arg1 = spider2(1,spider1(0))
Arg2 = TPmain(Arg1['front'])

print(Arg1)
spider3(Arg2['Distance'],Arg2['jetlag'],Arg2["dot"],Arg1['token'],spider1(0),2)