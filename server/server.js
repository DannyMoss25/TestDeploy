
const express = require('express')
const app = express()

const createClient = require("@supabase/supabase-js")



    


app.get("/api", (req, res) => {
    console.log("started")
    async function getCountries() {
        const supabase = createClient.createClient("https://esiyfbekcmmhojcwbazg.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzaXlmYmVrY21taG9qY3diYXpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEwNjI1NDQsImV4cCI6MjAzNjYzODU0NH0.C6lseANIEJ7680g5npbdNa_GNJzxoSTo4O8H7owGiTo")
        const { data } = await supabase.from("USERS_DANNY").select().eq("team_id",'111');
            start = 26

            var averageStrain = {}
            
            for (var a = 0; a < start; a++){
                var current_total = 0
                var totalNum = 0
                for (const key in data) {
                    totalNum += 1
                    current_total += data[key].strain_level["7_" + (start - a).toString()]
                }  
                averageStrain["7_" + (start - a).toString()] = current_total/totalNum
            }
            //console.log(average)

            avgStrainThen = 0
            avgStrainNow = 0

            for (var a = 0; a < 7; a++){
                for (const key in data) {
                    avgStrainNow += averageStrain["7_" + (start - a).toString()]
                    avgStrainThen += averageStrain["7_" + (start - a - 7).toString()]
                }
            }
            strainTrend = avgStrainNow/avgStrainThen



            var strainThen = 0
            var strainNow = 0

            var highestStrain = -1
            var lowestStrain = -1

            var highestStrainName = ""
            var lowestStrainName = ""

            for (const key in data) {
            var strainThen = 0
            var strainNow = 0
            for (var a = 0; a < 7; a++){
                strainThen += data[key].strain_level["7_" + (start - 7 - a).toString()]
                strainNow += data[key].strain_level["7_" + (start - a).toString()]
            }
            if(strainNow/strainThen > highestStrain || highestStrain < 0){
                highestStrain = strainNow/strainThen
                highestStrainName = data[key].name
            }
            if(strainNow/strainThen < lowestStrain || lowestStrain < 0){
                lowestStrain = strainNow/strainThen
                lowestStrainName = data[key].name
            }
            }





            var distanceThen = 0
            var distanceNow = 0

            var highestDistance = -1
            var lowestDistance = -1

            var highestDistanceName = ""
            var lowestDistanceName = ""

            for (const key in data) {
            var distanceThen = 0
            var distanceNow = 0
            for (var a = 0; a < 7; a++){
                distanceThen += data[key].distance_covered["7_" + (start - 7 - a).toString()]
                distanceNow += data[key].distance_covered["7_" + (start - a).toString()]
            }
            if(distanceNow/distanceThen > highestStrain || highestDistance < 0){
                highestDistance = distanceNow/distanceThen
                highestDistanceName = data[key].name
            }
            if(distanceNow/distanceThen < lowestDistance || lowestDistance < 0){
                lowestDistance = distanceNow/distanceThen
                lowestDistanceName = data[key].name
            }
            }





            var individualStrain = {}
            for (const key in data){
                var strain = 0
                for (var a = 0; a < start; a++) {
                    
                    strain = data[key].strain_level["7_26"]
                }  
                individualStrain[data[key].name] = strain
                
            }


            




            var averageHeart = {}
            var highestHeart = {}

            
            
            
            for (const key in data){
                var totalHeart = 0
                var totalNum = 0
                var largest = 0
                for (var a = 0; a < start; a++) {
                    totalNum += 1
                    var heart = data[key].heart_rate["7_" + (start - a).toString()]
                    totalHeart += heart
                    if(heart > largest){
                        largest = heart
                    }
                
                }  
                averageHeart[data[key].name] = totalHeart/totalNum
                highestHeart[data[key].name] = largest
            }


            avgHeartThen = 0
            avgHeartNow = 0
            var heartTrend = 0
            var totalLargestHeart = 0

            var totalLargestHeartName = ""


            for (const key in data) {
            for (var a = 0; a < 7; a++){
                    avgHeartNow += data[key].heart_rate["7_" + (start - a).toString()]
                    avgHeartThen += data[key].heart_rate["7_" + (start - a - 7).toString()]
                    if(data[key].heart_rate["7_" + (start - a).toString()] > totalLargestHeart){
                        totalLargestHeart = data[key].heart_rate["7_" + (start - a).toString()]
                        totalLargestHeartName = data[key].name
                    }
            }
            }
            heartTrend = avgHeartNow/avgHeartThen


            

            var totalDistance = {}

            var completeDistance = 0
            for (const key in data){
                var distance = 0
                for (var a = 0; a < start; a++) {
                    var yards = data[key].distance_covered["7_" + (start - a).toString()]
                    distance += yards
                    completeDistance += yards
                }  
                totalDistance[data[key].name] = distance
            }
            
            console.log(completeDistance)
            


            
            res.json({totalLargestHeart:totalLargestHeart, totalLargestHeartName, totalLargestHeartName, heartTrend:heartTrend, highestDistance:highestDistance, lowestDistance:lowestDistance,highestDistanceName:highestDistanceName,lowestDistanceName:lowestDistanceName,strainTrend: strainTrend, lowestStrain:lowestStrain, highestStrain:highestStrain, highestStrainName:highestStrainName, lowestStrain:lowestStrain, lowestStrainName:lowestStrainName, individualStrain: individualStrain, averageStrain: averageStrain, averageHeart:averageHeart, highestHeart:highestHeart, totalDistance: totalDistance, completeDistance})
    }

    getCountries()

    
    

})


app.listen(5000, ()=> {console.log("Server Started on Port 5000")})