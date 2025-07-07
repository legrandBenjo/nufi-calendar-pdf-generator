package com.legrandbenjo.calendarpdfgenerator;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.widget.ImageView;
import android.widget.RelativeLayout;

public class SplashActivity extends Activity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    RelativeLayout layout = new RelativeLayout(this);
    layout.setBackgroundColor(0xFF000000); // fond noir (optionnel)

    ImageView imageView = new ImageView(this);
    imageView.setImageResource(R.drawable.splash);
    imageView.setScaleType(ImageView.ScaleType.CENTER_CROP);

    layout.addView(imageView);
    setContentView(layout);

    new Handler().postDelayed(() -> {
      Intent intent = new Intent(SplashActivity.this, MainActivity.class);
      startActivity(intent);
      finish();
    }, 3000); // 3 secondes
  }
}
