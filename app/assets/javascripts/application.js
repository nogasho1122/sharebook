// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require rails-ujs
//= require activestorage
//= require_tree .



var map;
window.onload = function() {
  // 初期設定
  var MyLatLng = new google.maps.LatLng(37.916194,139.036389);
  var Options = {
  zoom: 6, //地図の縮尺値
  center: MyLatLng, //地図の中心座標
  mapTypeId: 'roadmap' //地図の種類
  };
  map = new google.maps.Map(document.getElementById('map'), Options);
}



// 試しコード
//検索ボタンをクリックしたとき
$('#searchAddressBtn').click(function () {
    //Geocoderオブジェクト生成
    var geocoder = new google.maps.Geocoder();
    //住所のテキストボックスから住所取得
    var address = $('[name=address]').val();
    //住所検索実行  
    geocoder.geocode(
            {
                'address': address,
                'region': 'jp'//地域を日本に設定
            },
            function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    //住所のデータを取得できたとき
 
                    //取得した座標をマップに反映
                    gMap.setCenter(results[0].geometry.location);
                    //取得した座標をマーカーに反映
                    var pos = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    gMarkerCenter.setPosition(pos);
 
                    //取得した座標をテキストボックスにセット
                    $('[name=lat]').val(pos.lat());
                    $('[name=lng]').val(pos.lng());
 
                } else {
                    //失敗したとき
                    alert('住所検索に失敗しました。<br>住所が正しいか確認してください');
                }
            }
    );
});

// いいね機能