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
  
const UserTweetList = (props) => {
 //   console.log(props);
  //  console.log(props.tweets);
    const username = props.username;
    var numTweets = 0;
    let timestamps = [];
    const rows = [];
    if (props.tweets != null) {
     //   console.log(Object.keys(props.tweets));
        numTweets = Object.keys(props.tweets).length - 1;
        timestamps = Object.keys(props.tweets).reverse();
        //const tweets = JSON.parse(props.tweets);
  //      console.log(props.tweets[timestamps[0]]);
        for (let i = 0; i < numTweets; i++) {
            // note: we are adding a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            if (timestamps[i] != 0) {
            const date = new Date(JSON.parse(timestamps[i])).toDateString();
            const time = formatDate(new Date(JSON.parse(timestamps[i])).toString()).substring(15,24);
            rows.push(<TweetCard username={username} content={props.tweets[timestamps[i]].content} date={date} time={time} key={i} pfp={props.tweets[timestamps[i]].pfp} />);
            }
        }
        }
    



    return <h2>{rows}</h2>;


};
export default UserTweetList;