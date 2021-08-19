import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { AlertController } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';
const { Camera } = Plugins;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileInfo: any;
  editMode = false;

  imagePath: any;

  constructor(
    private profileService: ProfileService,
    private photoLibrary: PhotoLibrary,
    private _sanitizer: DomSanitizer,
    public alertController: AlertController) { }

  ngOnInit() {
    this.profileInfo = this.profileService.getProfileInfo() ;
    console.log(this.profileInfo);
    const contentType = 'image/png';

    const blob = this.b64toBlob(this.profileInfo.value.avatar, contentType);
    const blobUrl = URL.createObjectURL(blob);

    this.profileInfo.value.avatarURL = blobUrl
  }

  changeEditMode(){
    this.editMode = !this.editMode;
    this.profileInfo = {... this.profileService.getProfileInfo()} ;

  }

  save(){
    this.editMode = !this.editMode;

    this.profileService.saveProfile(this.profileInfo);
  }

  async selectImageSourceAlert(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Change avatar',
      message: 'Click a button below',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },        {
          text: 'Camera',
          cssClass: 'primary',
          handler: (blah) => {
            this.selectImageSource('camera')
          }
        },
        {
          text: 'Gallery',
          cssClass: 'primary',
          handler: (blah) => {
            this.selectImageSource('photos')
          }
        },
      ]
    });

    await alert.present();
  }

  selectImageSource(cameraSource: string){
    if(cameraSource == 'photos'){
      this.addImage(CameraSource.Photos)
    }
    else{
      if(cameraSource == 'camera')
        this.addImage(CameraSource.Camera)
    }
    // const buttons = [
    //   {
    //     text: 'Take Photo',
    //     icon: 'camera',
    //     handler: () => {
    //       this.addImage(CameraSource.Camera)
    //     }
    //   },
    //   {
    //     text: 'Choose from gallery',
    //     icon: 'image',
    //     handler: () => {
    //       this.addImage(CameraSource.Photos)
    //     }
    //   }
    // ]
  }

  async addImage(source: any){
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source
    })

    //console.log(image.base64String);
    //const blobData = this.b64toBlob(image.base64String, `image/${image.format}`)
    //this.profileInfo.value.avatar = blobData;
    //console.log(this.profileInfo.value.avatar);
    this.imageMod(image);
  }

  imageMod(image:any){
    const blob = this.b64toBlob(image.base64String, '');
    const blobUrl = URL.createObjectURL(blob);
    console.log(blobUrl);

    this.profileInfo.value.avatarURL = blobUrl
  }

   b64toBlob(b64Data, contentType='', sliceSize=512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

}
