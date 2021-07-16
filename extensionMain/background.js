// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let domainMapArr = [];
let domainSwitch = false;
// chrome.storage.sync.set({domainToRap2: []})
chrome.storage.sync.get(
  {
    domainToRap2: [],
    domainSwitch: false
  },
  (result) => {
    console.log('get storage result---', result)
    domainMapArr = result.domainToRap2;
    domainSwitch = result.domainSwitch
  }
);
chrome.storage.onChanged.addListener((changes) => {
  chrome.storage.sync.get({
    domainToRap2: [],
    domainSwitch: false
  }, (result) => {
    console.log('storage result---', result)
    domainMapArr = result.domainToRap2; 
    domainSwitch = result.domainSwitch;
  });
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) { 
    // console.log('onBeforeRequest', JSON.stringify(details))
    let domainMap = {}
    domainMapArr.map(item => {
      if(item){
        domainMap[item.domain] = item.id
      }
    })
    if(!domainSwitch){
      return {cancel: false}
    }else{
      let domain = details.url.split('/')[2]
      let pathName = details.url.split('/').splice(3).join('/')
      if(domainMap[domain] && details.method.toLowerCase() !== 'options'){
        return {
          redirectUrl: `https://rap2api.alibaba-inc.com/app/mock/${domainMap[domain]}/${pathName}`
        };
      }
    }
  },
  {urls: ["<all_urls>"]},
  ['blocking', "requestBody"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
  // console.log('onBeforeSendHeaders~~~~~~', JSON.stringify(details));
  var headers = details.requestHeaders
    if(headers && headers.length){
      headers.map(item => {
        if(item.name.toLowerCase() === "access-control-request-method"){
          console.log('access-aontrol-request-method', item.value)
        }
      })
    }
  // if(details.url.indexOf('rap2api.alibaba-inc') > -1){
  //   headers.push({name: 'cros', value: 'true'})
  // }
  // console.log(JSON.stringify(headers));
  return {requestHeaders: headers};
},
{urls: [ "<all_urls>" ]},['blocking', 'requestHeaders']);

chrome.webRequest.onSendHeaders.addListener(function(details){
  // console.log('onSendHeaders---', JSON.stringify(details))
},{urls: [ "<all_urls>" ]})

chrome.webRequest.onHeadersReceived.addListener(details => {
  let headers = details.responseHeaders;
  let temptOrigin = details.initiator || "*";
  let domainMap = {}
    domainMapArr.map(item => {
      if(item){
        domainMap[item.domain] = item.id
      }
    })
    
  let domain = details.url.split('/')[2]
  console.log('onHeadersReceived--', domain, domainMap[domain])
  if(domainMap[domain]){
    for( var i = 0, l = headers.length; i < l; ++i ) {
      if( headers[i].name.toLowerCase() == 'content-type' ) {
        headers[i].value = 'application/json; charset=utf-8';
        break;
      } else if(headers[i].name.toLowerCase() === 'referrer-policy'){
        headers[i].value = 'origin';
      } else if(headers[i].name.toLowerCase() === 'Access-Control-Allow-Origin'){
        temptOrigin = headers[i].value
      }
    }
    console.log('temptOrigin~~~~', temptOrigin)
    headers.push({ name: 'referrer-policy', value: 'origin' });
    headers.push({ name: 'Vary', value: 'Origin' });
    headers.push({ name: 'EagleEye-TraceId', value: '7f00000215555791515824985e05ab' });
    headers.push({ name: 'Timing-Allow-Origin', value: '*' });
    headers.push({ name: 'Server', value: 'Tengine/Aserver' });
    headers.push({ name: 'Connection', value: 'keep-alive' });
    headers.push({ name: 'Access-Control-Allow-Origin', value: 'https://portalpro.hemaos.com'});
    headers.push({ name: 'Access-Control-Allow-Credentials', value: 'true' });
    headers.push({ name: 'access-control-allow-methods', value:  "*" });
    headers.push({ name: 'access-control-allow-headers', value:  "Content-Type, access-control-allow-headers, Authorization, X-Requested-With, X-Referer" });
    headers.push({ name: 'Content-Type', value:  "application/json; charset=utf-8" });
    // console.log('resheaders--', JSON.stringify(headers));
  }
  return {responseHeaders: headers};
}, {urls: ["<all_urls>"]}, ['blocking', 'responseHeaders']);
