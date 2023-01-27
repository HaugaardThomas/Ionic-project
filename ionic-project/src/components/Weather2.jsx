import React, {useState, useEffect} from "react";
import axios from "axios";
import Moment from "react-moment";
import "moment-timezone";
import "moment/locale/da";
import { IonGrid, IonRow, IonCol, IonImg, IonContent, IonText, IonTitle } from "@ionic/react";
import './Weather2.css';



const Weather2 = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        
        axios("https://api.openweathermap.org/data/2.5/onecall?lat=56.162939&lon=10.203921&exclude=%7Bcurrent,minutely,hourly,alert%7Ds&units=metric&appid=5cc6e0bf1f3f191db1b19ce522d3d79b")
      
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
    <>
        <IonRow> {/* Timezone */}
            <IonCol className="col_timezone">
            {data.timezone}
            </IonCol>
        </IonRow> 

        <IonRow>
            <IonCol className="col_current_temp">
            {Math.round(data.current.temp)}°c
            </IonCol>
        </IonRow>
        
        <IonRow>
            <IonCol className="col_line">
                -------------
            </IonCol>
        </IonRow>

        <IonRow>
        {data.current.weather.map((data) => 
              <IonCol className="col_current_weatherCondition">
           {data.main}
            
    
            </IonCol>
  
            
          
            )}
        </IonRow>

        <IonRow>
            <IonCol className="col_curren_temp_feels_like_under_line">
            {Math.round(data.current.temp)}°c / {Math.round(data.current.feels_like)}°c
            </IonCol>
        </IonRow>


                             {/* BOTTOM ROWS */}

                              {/* Icon Row */}

        <IonRow>
        {data.daily.slice(0, 1).map((data) => 
              <IonCol className="col_img_icons_bottom" size="4"  >
            <IonImg className="img_icons_bottom" src={"https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"}> </IonImg>
            </IonCol>
                )}
                 {data.daily.slice(1, 2).map((data) => 
              <IonCol size="4" className="col_img_icons_bottom" >
            <IonImg className="img_icons_bottom" src={"https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"}> </IonImg>
            </IonCol>
                )}
                        {data.daily.slice(2, 3).map((data) => 
              <IonCol size="4" className="col_img_icons_bottom" >
            <IonImg className="img_icons_bottom" src={"https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"}> </IonImg>
            </IonCol>
                )}
        </IonRow>

                            {/* Temp Row */}
        
        <IonRow>
        <IonCol size="4" className="col_current_temp_feels_like_bottom_left">
            {Math.round(data.current.temp)}°c / {Math.round(data.current.feels_like)}°c

            </IonCol>
            {data.daily.slice(1, 2).map((data, tempItem) => 
            <IonCol size="4" className="col_bottom_rows_temp"
             key={tempItem}>{Math.round(data.temp.day)}°c
            
            </IonCol>
            )}

            {data.daily.slice(2, 3).map((data, tempItem) => 
            <IonCol size="4" className="col_bottom_rows_temp"
             key={tempItem}>{Math.round(data.temp.day)}°c
            
            </IonCol>
            )}

        </IonRow>

                        {/* Dato Row */}

        <IonRow>
            <IonCol size="4"  className="col_date_bottom" >
              <Moment unix format="dddd">
                {data.current.dt}
              </Moment>
            </IonCol>
           {data.daily.slice(1, 2).map((data, dateItem) => 
            <IonCol size="4"  className="col_date_bottom" key={dateItem}>
              <Moment unix format="dddd">
                {data.dt}
              </Moment>
            </IonCol>
          )}
           {data.daily.slice(2, 3).map((data, dateItem) => 
            <IonCol size="4"  className="col_date_bottom" key={dateItem}>
              <Moment unix format="dddd">
                {data.dt}
              </Moment>
            </IonCol>
          )}
        </IonRow>



</>
    )

    }


    export default Weather2;