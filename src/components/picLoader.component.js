import React from 'react';
import axios from 'axios';
import { useState } from 'react';




 function handleSubmit  (e, pic) {
    e.preventDefault();
    const formData = new FormData();
    const user = localStorage.getItem('currentUser');
    formData.append("pic", pic);
    console.log(formData);
    axios.defaults.baseURL = 'https://staging-twittah.herokuapp.com' ;
    
     axios
      .post("/" + user + "/change-profile-pic", formData)
      .then(setTimeout(refreshPage, 5000))
     // .then(getAllPics())
      .catch((error) => console.log(error.message));
      
    };


    function refreshPage() {
        window.location.reload(false);
      }
    const PicUploader = (props) => {
    
  const [pic, setPic] = useState();
  const [allPics, setAllPics] = useState([]);
        
        
    
        return (

            <div className="app">
                
            <form className="form" onSubmit={(e) => handleSubmit(e, pic)} text="PFP">
            <p>
            Update your profile picture here! &nbsp; &nbsp; 
              <input type="file" onChange={(e) => setPic(e.target.files[0])}  accept='image/*' />
              
              <button>Upload</button></p>
            </form>
            </div>


  
       );
        };

    export default PicUploader;

  /*

            <div>
            <input type="file" onChange={(e) => handleChange(e, pic)} accept="/image/" />
            </div>
    const getAllPics = async () => {
      await axios
        .get("http://localhost:5000/pictures")
        .then((res) => setAllPics(res.data))
        .catch((error) => console.log(error.message));
    };
  
    const handleDelete = async (name) => {
      await axios
        .delete("http://localhost:5000/delete", {
          data: { name: name },
        })
        .then(getAllPics())
        .catch((error) => console.log(error.message));
    }; 
    

    handlePictureSelected(e) {
        var picture = e.target.files[0];
        var src = URL.createObjectURL(picture);

        this.setState({
            picture: picture,
            src: src
        });
    }

    renderPreview() {
        if (this.state.src) {
            return (
                <img src={this.state.src} />
            );
        } else {
            return (
                <p>
                    No Preview
                </p>
            );
        }
    }

    upload() {
        var formData = new FormData();

        formData.append("file", this.state.picture);
        const user = localStorage.getItem('currentUser');
        console.log(formData);

        if (user != null) {
            const sendData = { username: user, fileData: this.state.picture }

            if (!formData) {
                alert("Please upload an image first!");
            }
            
            axios.post('/change-profile-pic', sendData)
            .then(() => {
                // console.log(this.state);
               // this.callAPI();
                console.log("Pic received");
               // console.log(this.state);
            })
            .catch(err => {
                console.error(err);
            });

      
        };
   */  

   