import moment from "moment-timezone";
import { useEffect, useState } from "react";
import "./counter.css"

const Timezone = ()=>{
    const [originalDateTime, setDate] = useState();  //To Set the current time of user
    const [timeObject, settimeObject] = useState({
        NewYorktime: "0 0 0",
        LosAngelestime: "0 0 0",
    });   // To set the values of different timezone

    useEffect(()=>{
        setInterval(()=>{
            const momentdate = moment(new Date());
            const finaldate = momentdate.format("YYYY-MM-DD HH:mm:ss");
            setDate(finaldate);
        },1000); 
    },[])
    

    useEffect(()=>{
        const NewYorktimevalue = changetimezone(originalDateTime,"America/New_York");
        const LosAngelestimevalue = changetimezone(originalDateTime,"America/Los_Angeles");

        const time = {
            NewYorktime:NewYorktimevalue,
            LosAngelestime:LosAngelestimevalue,
        }
    settimeObject(time); 
    },[originalDateTime])

    // To Convert Time from one Time-Zone to Another
    // I/P(String): TimeZone name as per moment formate  return(String) : The newtimezone time    
    function changetimezone (date,timezone){
        const momentdate = moment(date);
        const newtztime  = momentdate.clone().tz(timezone);
        const finaltime =  newtztime.format("YYYY-MM-DD HH:mm:ss");
        return finaltime;
    }
    return(
        <>
        <h1>Your local time is:: {originalDateTime} </h1>
            <table>
                <thead>
                    <th>NewYork</th>
                    <th>LosAngeles</th>
                </thead>
                <tr>
                    <td>{timeObject.NewYorktime}</td>
                    <td>{timeObject.LosAngelestime}</td>
                </tr>
            </table>
        </>
    )
}

export default Timezone;