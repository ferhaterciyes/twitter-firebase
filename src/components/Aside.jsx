import { collection, count, getAggregateFromServer } from "firebase/firestore"
import { db } from "../firebase/confic"
import { useEffect, useState } from "react"

const Aside = () => {
  const tweetCol = collection(db , "tweets")
  const [data , setData] =useState(null)
  useEffect(()=>{
    
       //dokumanlarımızla alakalı istatistik heasplar
       // bizden kollksiyon ref ister
       // sum / average / count yardımıyla rapor adımları belirleme
   getAggregateFromServer(tweetCol , {
       tweetCount:count()
      }).then((data)=>setData(data._data))

  },[])



  return (
    <div className="max-lg:hidden">
      <p className="my-5 text-center p-3 font-bold text-lg">Toplam Tweet Sayısı : {data?.tweetCount?.integerValue}</p>
    </div>
  )
}

export default Aside