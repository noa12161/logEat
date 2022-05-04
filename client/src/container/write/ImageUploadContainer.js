import ImageBtn from '../../components/write/ImageBtn';
import { useDispatch, useSelector } from 'react-redux';
import { setValue, writePost } from '../../redux/post/writeSlice';

/*
  uploadImage -> convertBase64 -> setValue
  -> onSubmitForm -> 
*/
const ImageUploadContainer = () => {
  const dispatch = useDispatch();
  const { file } = useSelector((state) => state.write);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const fileName = file.name + Date.now();
    const base64 = await convertBase64(file);
    dispatch(setValue({ name: 'file', value: base64 }));
    dispatch(setValue({ name: 'fileName', value: fileName }));
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  return <ImageBtn uploadImage={uploadImage} file={file} />;
};

export default ImageUploadContainer;
