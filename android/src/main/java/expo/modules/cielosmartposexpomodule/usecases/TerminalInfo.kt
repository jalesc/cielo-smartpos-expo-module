package expo.modules.cielosmartposexpomodule

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.util.Base64
import expo.modules.cielosmartposexpomodule.R
import expo.modules.kotlin.Promise
import java.nio.charset.StandardCharsets

object TerminalInfoHandler {

  private var pendingPromise: Promise? = null

  fun startTerminalInfo(activity: Activity, promise: Promise) {
    try {
      pendingPromise = promise

      val schema = activity.getString(R.string.schema_return)
      val callback = activity.getString(R.string.callback_terminal_info)

      val uri = Uri.Builder()
        .scheme("lio")
        .authority("terminalinfo")
        .appendQueryParameter("urlCallback", "$schema://$callback")
        .build()

      val intent = Intent(Intent.ACTION_VIEW).apply {
        addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
        data = uri
      }

      activity.startActivity(intent)

    } catch (e: Exception) {
      pendingPromise = null
      promise.resolve(
        mapOf(
          "code" to 5002,
          "result" to e.message,
          "success" to false
        )
      )
    }
  }

  fun handleResponseIntent(intent: Intent?): Map<String, Any?> {
    val promise = pendingPromise ?: return emptyMap()
    pendingPromise = null

    return createResponseParams(intent).also { result ->
      promise.resolve(result)
    }
  }

  private fun createResponseParams(intent: Intent?): Map<String, Any?> {
    return try {
      val data = intent?.data
      val response = data?.getQueryParameter("response")

      if (response != null) {
        val decoded = Base64.decode(response, Base64.DEFAULT)
        val json = String(decoded, StandardCharsets.UTF_8)

        mapOf(
          "result" to json,
          "code" to "0",
          "success" to true
        )
      } else {
        mapOf(
          "result" to "Resposta inválida",
          "code" to "5010",
          "success" to false
        )
      }
    } catch (e: Exception) {
      mapOf(
        "result" to e.toString(),
        "code" to "5005",
        "success" to false
      )
    }
  }
}
