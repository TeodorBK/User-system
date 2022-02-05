/* importing css */
import classes from './Profile.module.css';

/* importing images */
import BackProfileImage1 from '../../images/BackProfileImage1.jpeg';
import BackProfileImage2 from '../../images/BackProfileImage2.jpeg';
import BackProfileImage3 from '../../images/backProfileImage3.jpeg';
import BackProfileImage4 from '../../images/backProfileImage4.jpeg';
import BackProfileImage5 from '../../images/backProfileImage5.jpeg';
import BackProfileImage6 from '../../images/backProfileImage6.jpeg';
import BackProfileImage7 from '../../images/backProfileImage7.jpeg';
import BackProfileImage8 from '../../images/backProfileImage8.jpeg';
import BackProfileImage9 from '../../images/backProfileImage9.jpeg';

/* main react function */
function BackImageEditor(props) {
  /* function to set the image that is selected to have a visible border */
  function setBackImage(imageId) {
    document.getElementById(`image1`).style.border = '3px solid transparent';
    document.getElementById(`image2`).style.border = '3px solid transparent';
    document.getElementById(`image3`).style.border = '3px solid transparent';
    document.getElementById(`image4`).style.border = '3px solid transparent';
    document.getElementById(`image5`).style.border = '3px solid transparent';
    document.getElementById(`image6`).style.border = '3px solid transparent';
    document.getElementById(`image7`).style.border = '3px solid transparent';
    document.getElementById(`image8`).style.border = '3px solid transparent';
    document.getElementById(`image9`).style.border = '3px solid transparent';

    document.getElementById(`image${imageId}`).style.border =
      '3px solid var(--main)';
  }

  /* function to change the backImage to the selected image */
  function changeBackImage() {
    /* looping to se which image from 1 to 9 is the selected image and setting the image av paramter in the changeBackImage function */
    for (let choosenImage = 1; choosenImage < 10; choosenImage++) {
      if (
        document.getElementById(`image${choosenImage}`).style.border ===
        '3px solid var(--main)'
      ) {
        props.changeBackImage(choosenImage);
      }
    }
  }

  /* returning jsx code */
  return (
    /* the image editor box */
    <div className={classes.editBackImageBox}>
      {/* box for the images */}
      <div className={classes.imageChoiceBox}>
        {/* image 1 */}
        <img
          id="image1"
          className={classes.image1}
          src={BackProfileImage1}
          alt="backImage"
          onClick={() => {
            setBackImage(1);
          }}
        />

        {/* image 2 */}
        <img
          id="image2"
          className={classes.image2}
          src={BackProfileImage2}
          alt="backImage"
          onClick={() => {
            setBackImage(2);
          }}
        />

        {/* image 3 */}
        <img
          id="image3"
          className={classes.image3}
          src={BackProfileImage3}
          alt="backImage"
          onClick={() => {
            setBackImage(3);
          }}
        />

        {/* image 4 */}
        <img
          id="image4"
          className={classes.image4}
          src={BackProfileImage4}
          alt="backImage"
          onClick={() => {
            setBackImage(4);
          }}
        />

        {/* image 5 */}
        <img
          id="image5"
          className={classes.image5}
          src={BackProfileImage5}
          alt="backImage"
          onClick={() => {
            setBackImage(5);
          }}
        />

        {/* image 6 */}
        <img
          id="image6"
          className={classes.image6}
          src={BackProfileImage6}
          alt="backImage"
          onClick={() => {
            setBackImage(6);
          }}
        />

        {/* image 7 */}
        <img
          id="image7"
          className={classes.image7}
          src={BackProfileImage7}
          alt="backImage"
          onClick={() => {
            setBackImage(7);
          }}
        />

        {/* image 8 */}
        <img
          id="image8"
          className={classes.image8}
          src={BackProfileImage8}
          alt="backImage"
          onClick={() => {
            setBackImage(8);
          }}
        />

        {/* image 9 */}
        <img
          id="image9"
          className={classes.image9}
          src={BackProfileImage9}
          alt="backImage"
          onClick={() => {
            setBackImage(9);
          }}
        />
      </div>

      {/* box for the save and cancle button */}
      <div className={classes.btnBox}>
        {/* cancle button */}
        <button
          className={classes.closeBtn}
          onClick={() => {
            props.editBackImage();
          }}
        >
          Lukk
        </button>

        {/* save button */}
        <button
          className={classes.saveBackImageBtn}
          onClick={() => {
            changeBackImage();
            props.editBackImage();
          }}
        >
          Lagre
        </button>
      </div>
    </div>
  );
}

/* exporting default react function */
export default BackImageEditor;
