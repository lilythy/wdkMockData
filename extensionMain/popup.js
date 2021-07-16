// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
document.addEventListener('DOMContentLoaded', documentEvents  , false);

// let changeColor = document.getElementById('changeColor');

// chrome.storage.sync.get('color', function(data) {
//   changeColor.style.backgroundColor = data.color;
//   changeColor.setAttribute('value', data.color);
// });

// changeColor.onclick = function(element) {
//   let color = element.target.value;
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.executeScript(
//         tabs[0].id,
//         {code: 'document.body.style.backgroundColor = "' + color + '";'});
//   });
// };

let switchMockType = document.getElementById('switchMockType');

function myAction(input) { 
  console.log("input value is : " + input.value);
  alert("The entered data is : " + input.value);
}

function documentEvents() { 
  switchMockType.addEventListener('click',function(element) {
    var rapId = document.getElementById('rapId')
    myAction(rapId)
    
    // $.ajax({
    //   url : 'http://rap2api.alibaba-inc.com/app/mock/3130/example/1552445176372', // 自动拦截
    //   method : 'GET',
    //   dataType : 'JSON',
    //   success : function(data) {
    //     // 返回根据RAP文档及规则生成的mock数据
    //     // $('#result').html(JSON.stringify(data))
    //     alert(JSON.stringify(data))
    //   }
    // })
  })

}