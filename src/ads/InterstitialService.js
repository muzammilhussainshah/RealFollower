import {
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';

export class IntertitialService {
  static canLoadFB = true;
  interstitialAdmob = null;

  admob_inter_id = null;
  appConfig = null;
  isAdmobLoaded = false;
  isFBLoaded = false;
  admobEventLoadedListener = null;
  admobEventClosedListener = null;
  admobEventErrorListener = null;

  constructor(fb_inter_id, admob_inter_id, appConfig) {
    this.admob_inter_id = admob_inter_id;
    this.fb_inter_id = fb_inter_id;
    this.appConfig = appConfig;
  }

  showADMOBInter() {
    if (
      this.isAdmobLoaded &&
      this.interstitialAdmob &&
      this.admob_inter_id != ''
    ) {
      this.isAdmobLoaded = false;
      console.warn('show admob anyway');
      this.interstitialAdmob.show();
      return;
    }
  }

  load() {
    this.loadAdmob();
  }

  loadAdmob(show, onClosed = () => { }, onError = () => { }, onLoad = () => { }) {
    this.unsubscribe();
    if (!this.admob_inter_id) {
      return;
    }
    this.isAdmobLoaded = false;
    // console.warn('load admob');
    let loadPromise = new Promise((resolve, reject) => {
      this.interstitialAdmob = InterstitialAd.createForAdRequest(
        this.admob_inter_id,
      );
      this.admobEventLoadedListener = this.interstitialAdmob.addAdEventListener(AdEventType.LOADED, () => {
        this.isAdmobLoaded = true;
        onLoad();
        if (show) {
          this.showInter();
        }
        console.warn('admob interstitial loaded');
        resolve(true);
      });
      this.admobEventErrorListener = this.interstitialAdmob.addAdEventListener(AdEventType.ERROR, (e) => {
        onError();
        this.isAdmobLoaded = false;
        console.warn('admob interstitial failed', e);
        reject(e);
      });
      this.admobEventClosedListener = this.interstitialAdmob.addAdEventListener(AdEventType.CLOSED, () => {
        onClosed();
        this.isAdmobLoaded = false;
        console.warn('admob interstitial closed');
        reject();
      });
    });
    this.interstitialAdmob.load();
    return loadPromise;
  }

  unsubscribe() {
    if (this.admobEventLoadedListener) {
      this.admobEventLoadedListener();
    }
    if (this.admobEventErrorListener) {
      this.admobEventErrorListener();
    }
  }

  async showInter() {
    this.showADMOBInter();
  }
}
