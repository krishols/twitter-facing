import { MDBCardImage } from "mdb-react-ui-kit";
const TweetCard = (props) => {
 
    return <div style={{margin: '0 0 2em 0'}} class="card text-center">
    <div class="card-body">
    <div className="flex-shrink-0">
                            {props.pfp != null &&
                            <MDBCardImage
                                style={{ width: '180px', borderRadius: '10px' }}
                                src={props.pfp}
                                alt='Generic placeholder image'
                                fluid />}
                        </div>
      <h5 class="card-title">@{props.username}</h5>
      <p class="card-text">{props.content}</p>
    </div>
    <div class="card-footer text-muted">{props.time}</div>
    <div class="card-footer text-muted">{props.date}</div>
  </div>

}
export default TweetCard;