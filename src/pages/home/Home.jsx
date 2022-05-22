import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { api_url } from "../../Url";

export default function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const [userstat, setUserStat] = useState([]);

  useEffect(() => {
    const getUserStats = async () => {
      try {
        const res = await axios.get(`${api_url}users/stats`);
        const statlist=res.data.sort(function(a,b){
         
          return a._id-b._id
        })

        statlist.map((item) => {
          return setUserStat((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], users: item.total },
          ]);
        });
      
      } catch (e) {
        console.log(e);
      }
    };
    getUserStats();
  }, [MONTHS]);

 
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userstat}
        title="User Analytics"
        grid
        dataKey="users"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
