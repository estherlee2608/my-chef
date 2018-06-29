/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.lee.mychef;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.auth.api.signin.GoogleSignInResult;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;


import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.GoogleAuthProvider;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthCredential;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Stack;
import java.util.Vector;

import org.apache.cordova.*;
import org.json.JSONObject;
import org.json.JSONArray;

public class MainActivity extends CordovaActivity implements GoogleApiClient.OnConnectionFailedListener
{
    private static final int RC_SIGN_IN = 10;
    public GoogleApiClient mGoogleApiClient;
    public GoogleSignInClient mGoogleSignInClient;
    public FirebaseAuth mAuth;
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.init();

        FirebaseDatabase firebaseDatabase = FirebaseDatabase.getInstance();
        DatabaseReference databaseReference = firebaseDatabase.getReference();

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        //자바스크립트에서 사용할 자바스크립트인터페이스(MainActivity)만들기
        View engineView = this.appView.getEngine().getView();
        if(engineView instanceof WebView) {
            // Let's add a JavaScript interface to MainActivity
            ((WebView) engineView).addJavascriptInterface(this, "MainActivity"); // You can call "MainActivity" whatever you want
        }
        else {
            // ERROR: Cordova isn't using WebView! We're in trouble here!!
        }

        // Configure Google Sign In 구글 로그인을 위한 세팅
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.default_web_client_id))
                .requestEmail()
                .build();

        mGoogleSignInClient = GoogleSignIn.getClient(this, gso);
        mAuth = FirebaseAuth.getInstance();

        // Set by <content src="index.html" /> in config.xml
        //loadUrl(launchUrl);
        loadIndex(); //시작화면을 로드하는 loadIndex() 호출
    }

    // 로그인되있는 상태면 바로 메인화면 출력, 로그인안되있으면 로그인화면 출력
    @JavascriptInterface
    public void loadIndex() {
        FirebaseUser currentUser = mAuth.getCurrentUser();
        if(currentUser != null) {
            //user is signed in
            loadUrl(launchUrl);
        }
        else {
            //user is signed out
            loadUrl("file:///android_asset/www/login.html");
            //loadUrl(launchUrl);
        }
    }

    //토스트 메세지 띄우는 메소드
    @JavascriptInterface
    public  void showToast(String toast) {
        Toast.makeText(this, toast, Toast.LENGTH_SHORT).show();
    }

    //DB에 저장할 때 쓰는 메소드
    @JavascriptInterface
    public void  setDB(String s) {
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference myRef = database.getReference();

        myRef.child("message").push().setValue(s);
    }

    //sing In 버튼을 누르면 호출되는 메소드
    @JavascriptInterface
    public void  signIn() {
        //Intent signInIntent = Auth.GoogleSignInApi.getSignInIntent(mGoogleApiClient);
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();
        startActivityForResult(signInIntent, RC_SIGN_IN);
    }

    // [START on_start_check_user]
    @Override
    public void onStart() {
        super.onStart();
        // Check if user is signed in (non-null) and update UI accordingly.
        FirebaseUser currentUser = mAuth.getCurrentUser();
    }
    // [END on_start_check_user]

    // [START onactivityresult] 로그인 시도했을 때 호출되는 부분. 성공하면 로그인되고, 파이어베이스에도 계정정보가 전달됨. 에러발생 시 에러메세지 출력
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        // Result returned from launching the Intent from GoogleSignInApi.getSignInIntent(...);
        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            try {
                // Google Sign In was successful, authenticate with Firebase
                GoogleSignInAccount account = task.getResult(ApiException.class);
                firebaseAuthWithGoogle(account);

            } catch (ApiException e) {
                // Google Sign In failed, update UI appropriately
                Toast.makeText(this, "ERROR "+e.getMessage(), Toast.LENGTH_SHORT).show();
                // [START_EXCLUDE]

                // [END_EXCLUDE]
            }
        }
    }
    // [END onactivityresult]

    // [START auth_with_google] 로그인 성공했을 때 호출되는 부분. 로그인한 정보로 파이어베이스 인증기능에 등록되고 사용자 정보를 출력할 수 있다.
    String userName ="";
    public void firebaseAuthWithGoogle(GoogleSignInAccount acct) {

        AuthCredential credential = GoogleAuthProvider.getCredential(acct.getIdToken(), null);
        mAuth.signInWithCredential(credential)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            // Sign in success, update UI with the signed-in user's information
                            FirebaseUser user = mAuth.getCurrentUser();
                            //updateUI(user);
                            // Name, email address, and profile photo Url
                            String name = user.getDisplayName();
                            userName = user.getDisplayName();
                            String email = user.getEmail();
                            //Uri photoUrl = user.getPhotoUrl();

                            // Check if user's email is verified
                            boolean emailVerified = user.isEmailVerified();

                            // The user's ID, unique to the Firebase project. Do NOT use this value to
                            // authenticate with your backend server, if you have one. Use
                            // FirebaseUser.getToken() instead.
                            String uid = user.getUid();
                            Toast.makeText(MainActivity.this, "로그인 성공" + " 이름 : " + name + " 이메일 : " + email + " 메일인증여부 : " + emailVerified + " uid : " + uid, Toast.LENGTH_SHORT).show();
                            loadIndex();
                        } else {
                            // If sign in fails, display a message to the user.
                            Toast.makeText(MainActivity.this, "Authentication failed.",
                                    Toast.LENGTH_SHORT).show();

                        }

                        // ...
                    }
                });
    }
    // [END auth_with_google]

    // [START signOut] sign Out 버튼을 누르면 호출되는 메소드. 로그아웃 되고 로그인화면을 출력한다.
    @JavascriptInterface
    public void signOut() {
        // Firebase sign out
        mAuth.signOut();

        // Google sign out
        mGoogleSignInClient.signOut().addOnCompleteListener(this,
                new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        //    updateUI(null);
                    }
                });
        loadIndex();
    }
    // [END signOut]

    // [START revokrAccess] 로그아웃.? 비슷한 기능인것같음. 계정을 잠시 해제하거나 그런 정도의 차이로 보임.
    @JavascriptInterface
    public void revokeAccess() {
        // Firebase sign out
        mAuth.signOut();
        // Google revoke access
        mGoogleSignInClient.revokeAccess().addOnCompleteListener(this,
                new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        //updateUI(null);
                    }
                });
        loadIndex();
    }
    // [END revokrAccess]

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {

    }

    //DB에 데이터를 쓰기 위한 메소드
    @JavascriptInterface
    public void setUsersDB(String s) {
        String name = userName;

        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference myRef = database.getReference().child("users").child(name);


        myRef.child(name).child("refrigerator").push().setValue(s);

    }

    //DB에 데이터를 쓰기 위한 메소드2
    @JavascriptInterface
    public void setDateDB(String s) {
        String name = userName;

        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference myRef = database.getReference().child("users").child(name);


        myRef.child(name).child("date").push().setValue(s);

    }

    //DB에 데이터를 쓰기 위한 메소드3
    @JavascriptInterface
    public void setUsersShopDB(String s) {
        String name = userName;

        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference myRef = database.getReference().child("users");

        myRef.child(name).child("shopping list").push().setValue(s);
    }

} // [End of MainActivity]