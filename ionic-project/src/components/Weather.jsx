import React, {useState, useEffect} from "react";
import axios from "axios";
import Moment from "react-moment";
import "moment-timezone";
import "moment/locale/da";
import { IonGrid, IonRow, IonCol, IonImg, IonContent, IonText, IonTitle } from "@ionic/react";
import './Weather.css';
import Sky from '../images/sky.jpg';
import Landscape from '../images/photo-1564599826778-dcb8f1481c51.jpg';
import Forest from '../images/forest-path-panorama-25795025.jpg';

const Weather = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        
        axios("https://api.openweathermap.org/data/2.5/onecall?lat=56.162939&lon=10.203921&exclude=current,minutely,hourly,alert&units=metric&appid=bf10281ffcd314875cfb488349d66bfa")
      
        .then((response) => {
            setData(response.data)
        })
        .catch((error) => {
            setError(error)
        })

        .finally(() => {
            setLoading(false);
        })

    },[])

   



   
    if(loading) return <>Loading...</>  // Hvis den loader så retunere "" dataen
    if(error) return <>Error...</> // Hvis der er Error så retunere "" error
  
    
    

    return (

        
      <IonGrid>

        <IonRow> {/* Dato/Dag */}
          {data.daily.slice(0, 7).map((data, dateItem) => 
            <IonCol  className="IonCol_Weather_date" key={dateItem}>
              <Moment unix format="dddd">
                {data.dt}
              </Moment>
            </IonCol>
            

          )}
        </IonRow>

        <IonRow> {/* Img/Icons */}
        {data.daily.slice(0, 7).map((data, weatherItem) => 
              

            <IonCol className="IonCol_img_icons" key={weatherItem}>
         
          <IonImg  src={"https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"}> </IonImg>
         
       
          </IonCol>

          
        
          )}
    
  
        </IonRow>
 
        <IonRow>  {/* Temp */}
          {data.daily.slice(0, 7).map((data, tempItem) => 
            <IonCol className="IonCol_temp"
             key={tempItem}>{Math.round(data.temp.day)}
            
            </IonCol>
            
          )}
        </IonRow>



        <IonRow> {/* Images w/ Text*/}
            <IonCol className="col_img_big_left" col="6">
              <IonImg className="img_big" src={Sky} ></IonImg>
              <IonText className="text_box_under_img_1">Blå himmel, sol og forår: Men vinden snyder dig i de her dage</IonText>
            </IonCol>
            <IonCol className="col_img_big_right" col="6">
              <IonImg className="img_big" src={Landscape}></IonImg>
              <IonText className="text_box_under_img_2">Ok ... Så er vi med igen ... det svigter aldrig, ok sydover lige nu</IonText>
            </IonCol>
        </IonRow>

        <IonRow className="row_bottom">
          <IonCol className="col_img_bottom" size="4">
            <IonImg className="img_fores_bottom" src={Forest}></IonImg>
          </IonCol>
          <IonCol className="col_bottom_blue_box" size="8">
            <IonTitle className="col_title_bottom">Det bliver varmere snart</IonTitle>
            <IonText className="col_text_bottom">Op til 19.34 grader og høj sol om hjørnet... yeahhhh!!</IonText>
          </IonCol>
        </IonRow>

   
      </IonGrid>
    );
}

export default Weather;