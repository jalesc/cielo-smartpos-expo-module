# 💳 cielo-smartpos-expo-module

[Expo](https://expo.dev) module library to simplify integration with Cielo SmartPOS

## 🚀 Installation

```bash
npm i cielo-smartpos-expo-module
```

## Usage

```typescript
import {
  doAsyncPayment,
  doAsyncVoidPayment,
  doAsyncPrintText,
  doAsyncPrintBitmap,
  getSerialNumber,
  doAsyncGetTerminalInfo,
  CieloSmartposExpoModule,
} from "cielo-smartpos-expo-module";
```

### AndroidManifest.xml setup
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <uses-permission android:name="android.permission.INTERNET"/>
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
  <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
  <uses-permission android:name="android.permission.VIBRATE"/>
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>

  <queries>
    <package android:name="com.ads.lio.uriappclient" />
  </queries>

  <queries>
    <intent>
      <action android:name="android.intent.action.VIEW"/>
      <category android:name="android.intent.category.BROWSABLE"/>
      <data android:scheme="https"/>
    </intent>
  </queries>

  <application
    android:name=".MainApplication"
    android:label="@string/app_name"
    android:icon="@mipmap/ic_launcher"
    android:roundIcon="@mipmap/ic_launcher_round"
    android:allowBackup="true"
    android:theme="@style/AppTheme"
    android:supportsRtl="true"
    android:enableOnBackInvokedCallback="false"
    android:requestLegacyExternalStorage="true">

    <meta-data android:name="expo.modules.updates.ENABLED" android:value="false"/>
    <meta-data android:name="expo.modules.updates.EXPO_UPDATES_CHECK_ON_LAUNCH" android:value="ALWAYS"/>
    <meta-data android:name="expo.modules.updates.EXPO_UPDATES_LAUNCH_WAIT_MS" android:value="0"/>

    <activity
      android:name=".MainActivity"
      android:configChanges="keyboard|keyboardHidden|orientation|screenSize|screenLayout|uiMode"
      android:launchMode="singleTask"
      android:windowSoftInputMode="adjustResize"
      android:theme="@style/Theme.App.SplashScreen"
      android:exported="true"
      android:screenOrientation="portrait">

      <!-- App Launcher -->
      <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
      </intent-filter>

      <!-- Callback: payment -->
      <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:host="payment" android:scheme="@string/schema_return" />
      </intent-filter>

      <!-- Callback: payment reversal -->
      <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:host="payment-reversal" android:scheme="@string/schema_return" />
      </intent-filter>

      <!-- Callback: print -->
      <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:host="print" android:scheme="@string/schema_return" />
      </intent-filter>

      <!-- Callback: terminal info -->
      <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:host="terminalinfo" android:scheme="@string/schema_return" />
      </intent-filter>
    </activity>
  </application>
</manifest>

```

### Strings.xml setup
```xml
<resources>
  <string name="app_name">cielo-smartpos-expo-module-example</string>
  <string name="expo_splash_screen_resize_mode" translatable="false">contain</string>
  <string name="expo_splash_screen_status_bar_translucent" translatable="false">false</string>

  <!-- Scheme used for deep link callbacks -->
  <string name="schema_return">cielo-smartpos-expo-module</string>

  <!-- Hosts used by intent filters -->
  <string name="callback_payment">payment</string>
  <string name="callback_payment_reversal">payment-reversal</string>
  <string name="callback_print">print</string>
  <string name="callback_terminal_info">terminalinfo</string>
</resources>
```

## ⚠️ Important rule about the host name: it must match the screen route (Expo Router)
The host defined in each intent filter must match the exact route of the screen that will receive the deep link callback.

Examples:

app/index.tsx           → host must be "index"

app/payment.tsx         → host must be "payment"

app/sell/finish.tsx     → host must be "finish"

So, for example:

✔ If your callback should return to app/index.tsx:

```xml
<data android:host="index" android:scheme="@string/schema_return" />
```

✔ For a screen like app/payment.tsx:
```xml
<data android:host="payment" android:scheme="@string/schema_return" />
```

This is mandatory, because SmartPOS always returns in the format:
```ruby
<scheme>://<host>
```

And the host must match your route exactly for Expo Router to open the correct screen.


📁 You can check all function examples in example/App.tsx

## 📚 API Reference

### 🔧 Functions

**doAsyncPayment:**
Starts a payment operation.

**doAsyncVoidPayment:**
Performs a void (cancellation) of a previous payment.

**doAsyncPrintText:**
Starts a text print

**doAsyncPrintBitmap:**
Starts a image print

**doAsyncGetTerminalInfo:**
Fetches terminal info (battery level, device model, IMEI, logic number, merchant code, serial number).

**getSerialNumber:**
Returns the SmartPOS device serial number.

**CieloSmartposExpoModule:**
Default exported module object (contains methods registration helpers).

## 📘 Important notice (Cielo documentation)
For full details about how SmartPOS deep link integration works, developers must consult the official Cielo documentation:

👉 **[Cielo SmartPOS Deep Link Integration](https://developercielo.github.io/manual/cielo-lio#integração-via-deep-link)**

This library does not replace the official flow; it only simplifies the communication layer.

## Contributing

🤝 Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)