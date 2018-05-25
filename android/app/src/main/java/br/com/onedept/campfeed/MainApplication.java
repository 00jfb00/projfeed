package br.com.onedept.campfeed;

import android.support.annotation.Nullable;

import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.admob.RNFirebaseAdMobPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;

import java.util.List;
import java.util.Arrays;

public class MainApplication extends NavigationApplication {
  @Override
  public boolean isDebug() {
      return BuildConfig.DEBUG;
  }

  @Nullable
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
        new VectorIconsPackage(),
        new RNFirebasePackage(),
        new RNFirebaseAdMobPackage() ,
        new RNFirebaseAnalyticsPackage(),
        new RNFirebaseMessagingPackage()
    );
  }

  @Nullable
  @Override
  public String getJSMainModuleName() {
      return "index";
  }
}