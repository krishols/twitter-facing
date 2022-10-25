import TweetCard from "./tweetcard.component";
function formatDate(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
      h = hh - 12;
      dd = "PM";
    }
    if (h == 0) {
      h = 12;
    }
    m = m < 10 ? "0" + m : m;
  
    s = s < 10 ? "0" + s : s;
  
    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */
  
    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
  
    var replacement = h + ":" + m;
    /* if you want to add seconds
    replacement += ":"+s;  */
    replacement += " " + dd;
  
    return date.replace(pattern, replacement);
  }



  
const DashTweetList = (props) => {
    console.log(props.tweets);
    var bigTweets = props.tweets;
    var allTweets = [];
    var rows = [];
    if (bigTweets != null) {
    bigTweets.forEach(userTweets => {
      for (var singleTweet in userTweets) {
        allTweets.push({[singleTweet]: userTweets[singleTweet]});
        //alert('item ' + i + ': ' + property + '=' + object[property]);
      }
    });

    //const username = props.username;
    var numTweets = 0;
    let timestamps = [];
    
    if (allTweets != []) {
       allTweets =  allTweets.sort((a, b) => parseFloat(Object.keys(b)) - parseFloat(Object.keys(a)));
 //   console.log(tweets);
  //      console.log(Object.keys(props.tweets));
        numTweets = Object.keys(allTweets).length;
       // timestamps = Object.keys(props.tweets).reverse();
        //const tweets = JSON.parse(props.tweets);
        //console.log(props.tweets[timestamps[0]]);
     //  console.log(props.tweets);
        for (let i = 0; i < numTweets; i++) {
           // console.log(props.tweets[i]);
            var timestamp = Object.keys(allTweets[i]);
            
            // note: we are adding a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            if (timestamp != 0) {
            const date = new Date(JSON.parse(timestamp)).toDateString();
            const time = formatDate(new Date(JSON.parse(timestamp)).toString()).substring(15,24);
            rows.push(<TweetCard username={allTweets[i][timestamp]['username']} content={allTweets[i][timestamp].content} date={date} time={time} key={i} pfp={allTweets[i][timestamp].pfp} />);
            }
        }
      }
        
    

    }

    return <h2>{rows}</h2>;


};
export default DashTweetList;