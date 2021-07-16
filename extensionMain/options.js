// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let page = document.getElementById('buttonDiv');
function constructOptions() {
  let input = document.createElement('input');
  let button = document.createElement('button');
  // for (let item of kButtonColors) {
  //   let button = document.createElement('button');
  //   button.style.backgroundColor = item;
  //   button.addEventListener('click', function() {
  //     chrome.storage.sync.set({color: item}, function() {
  //       console.log('color is ' + item);
  //     })
  //   });
  //   page.appendChild(button);
  // }
  input.setAttribute('value', 'test')
  button.addEventListener('click', function() {
        console.log('val', input.value)
      });
  page.appendChild(input);
  page.appendChild(button);
}
constructOptions();
