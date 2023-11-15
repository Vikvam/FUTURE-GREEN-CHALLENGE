window.hjSiteSettings = window.hjSiteSettings || {"site_id":3345114,"r":0.4387119527116402,"rec_value":0.4799999999999999,"state_change_listen_mode":"automatic","record":true,"continuous_capture_enabled":true,"recording_capture_keystrokes":true,"session_capture_console_consent":false,"anonymize_digits":true,"anonymize_emails":true,"suppress_all":false,"suppress_all_on_specific_pages":[],"suppress_text":false,"suppress_location":false,"user_attributes_enabled":false,"legal_name":null,"privacy_policy_url":null,"deferred_page_contents":[],"record_targeting_rules":[],"feedback_widgets":[],"heatmaps":[],"polls":[],"integrations":{"optimizely":{"tag_recordings":false},"abtasty":{"tag_recordings":false},"mixpanel":{"send_events":false},"unbounce":{"tag_recordings":false},"google_optimize":{"tag_recordings":false},"hubspot":{"enabled":false,"send_recordings":false,"send_surveys":false}},"features":["feedback.widgetV2","survey.embeddable_widget","survey.image_question","feedback.embeddable_widget","error_reporting","client_script.compression.pc","ask.popover_redesign","survey.type_button","settings.billing_v2","heatmap.continuous.manual_retaker"],"tracking_code_verified":true};

!function(){"use strict";function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var t,r=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.send=e,this.batchSize=r,this.flushInterval=n,this.buffer=[],this.flushTimer=null}var r,n;return r=t,(n=[{key:"getBuffer",value:function(){return this.buffer}},{key:"add",value:function(e){var t=this;this.buffer.push(e),this.buffer.length>=this.batchSize?this.flush():this.flushTimer||(this.flushTimer=setTimeout((function(){t.flush()}),this.flushInterval))}},{key:"flush",value:function(){this.buffer.length>0&&(this.send(this.buffer),this.buffer=[]),this.flushTimer&&(clearTimeout(this.flushTimer),this.flushTimer=null)}}])&&e(r.prototype,n),t}();function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var s,o=function(){try{return"performance"in window&&"now"in window.performance}catch(e){return!1}},c={version:6,metricsUrl:(null===(t=window._hjSettings)||void 0===t?void 0:t.metricsUrl)||"https://metrics.hotjar.io",sampling:{metrics:.1,fieldMetrics:.01,debug:.5,universalDebug:.05*.1},browser:{hasPerformance:!1,shouldLogMetrics:!1,inLab:!1},buffer:{bufferSize:40,flushInterval:3e3}},u={isDebugEnabled:!1,isMetricsEnabled:!1,isFieldMetricsEnabled:!1,loggedMetrics:{},genericTags:{}},l=function(e,t,r){u.loggedMetrics[e]=i(i({},u.loggedMetrics[e]),{},a({},t,r||{}))},f=function(e){if(!e)return"value";var t=Object.keys(e)[0];return t&&e[t]||"value"},d=function(e){var t,r=null!==(t=e.tag)&&void 0!==t?t:void 0;return u.isDebugEnabled?i(i(i({},r),e.extraTags),u.genericTags):r},h=function(e,t){if(!s)return!1;var r=u.isMetricsEnabled||u.isDebugEnabled;return"lab"===e&&(r=c.browser.inLab),"field"===e&&(r=u.isFieldMetricsEnabled),t?r&&t.flush:r},g=function(e){var t=!1,r="v=".concat(c.version),n=u.isDebugEnabled?"".concat(c.metricsUrl,"?").concat(r,"&debug=true"):"".concat(c.metricsUrl,"?").concat(r),i=JSON.stringify(e);if("sendBeacon"in navigator)try{t=navigator.sendBeacon.bind(navigator)(n,i)}catch(e){}if(!1===t)try{var a=new XMLHttpRequest;a.open("POST",n),a.timeout=1e4,a.send(i)}catch(e){}c.browser.shouldLogMetrics&&console.debug("New Metrics: ",e)},b={getConfig:function(e){return c[e]},getState:function(e){return u[e]},start:function(){try{c.browser={hasPerformance:o(),shouldLogMetrics:/hjMetrics=1/.test(location.search),inLab:/hjLab=true/.test(location.search)};var e=b.time(),t=window.hjSiteSettings||{},n=t.features,i=t.site_id,a=new Set(n),l=c.sampling;return u.genericTags={site_id:i},u.isDebugEnabled=Math.random()<=l.universalDebug||a.has("client_script.metrics.debug")&&Math.random()<=l.debug,u.isMetricsEnabled=Math.random()<=l.metrics,u.isFieldMetricsEnabled=u.isMetricsEnabled&&Math.random()<=l.fieldMetrics,s=new r(g,c.buffer.bufferSize,c.buffer.flushInterval),e}catch(e){console.debug("Error in metrics.start",{error:e})}},reset:function(){u.loggedMetrics={}},stop:function(){u.isDebugEnabled=!1,u.isMetricsEnabled=!1,u.genericTags={}},count:function(e,t){var r=t.incr,n=t.tag,o=t.extraTags,c=t.type;try{var l=f(n),g=u.loggedMetrics[e],b=0;if(r?(b=(g&&g[l]||0)+(r.value||1),u.loggedMetrics[e]=i(i({},g),{},a({},l,(null==r?void 0:r.flush)?0:b))):b=1,h(c,r)){var v={name:e,type:"count",value:b,tags:d({tag:n,extraTags:o})};s.add(v)}}catch(e){}},distr:function(e,t){var r=t.task,n=t.value,i=t.extraTags;h()&&s.add({name:e,type:"distribution",value:n,tags:d({tag:{task:r},extraTags:i})})},time:function(){try{if(!c.browser.hasPerformance)return;return performance.now()}catch(e){}},timeEnd:function(e,t){var r=t.tag,n=t.start,i=t.total,a=t.extraTags,o=t.type;try{var c=b.time();if(!i&&!c)return;var u=f(r),g=i||(n&&c?c-n:void 0);if(l(e,u,{}),g&&g>0&&h(o)){var v={name:e,type:"distribution",value:Math.round(g),tags:d({tag:r,extraTags:a})};s.add(v)}return c}catch(t){console.debug("Failed to send timer metric: ",{name:e,tag:r,error:t})}},timeIncr:function(e,t){var r,n,i,a,s=t.tag,o=t.start,c=t.flush,d=t.extraTags,h=t.type,g=hj.metrics.time(),v=o&&g?g-o:void 0,m=(r=e,{tagName:n=f(s),start:(a=(i=u.loggedMetrics[r])&&i[n]||{}).start,total:a.total}),w=v?v+(m.total||0):m.total;return l(e,m.tagName,{total:w}),c&&b.timeEnd(e,{tag:s,total:w,extraTags:d,type:h}),w},timeWatcher:function(){var e,t=0,r=!1,n=function(){var r,n=b.time();return t+=null!==(r=e&&n&&n-e)&&void 0!==r?r:0,e=b.time(),t};return{start:function(){if(!r)return r=!0,e=b.time()},incr:n,end:function(){var r=n();return t=0,e=void 0,r}}},getErrorMessage:function(e){return e instanceof Error?e.message:"string"==typeof e?e:""}};window.hj=window.hj||function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];(window.hj.q=window.hj.q||[]).push(t)},window.hj.metrics=b;var v=hj.metrics.start();window.hjBootstrap=window.hjBootstrap||function(e,t,r){var n,i=new RegExp("bot|google|headless|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|phantomjs|pingdom|ahrefsbot","i"),a=(null===(n=window.navigator)||void 0===n?void 0:n.userAgent)||"unknown";if(i.test(a))return hj.metrics.count("session-rejection",{tag:{reason:"bot"}}),void console.warn("Hotjar not launching due to suspicious userAgent:",a);var s="http:"===window.location.protocol,o=Boolean(window._hjSettings.preview);if(s&&!o)return hj.metrics.count("session-rejection",{tag:{reason:"https"}}),void console.warn("For security reasons, Hotjar only works over HTTPS. Learn more: https://help.hotjar.com/hc/en-us/articles/115011624047");var c=function(e,t,r){window.hjBootstrapCalled=(window.hjBootstrapCalled||[]).concat(r),window.hj&&window.hj._init&&window.hj._init._verifyInstallation&&hj._init._verifyInstallation()};c(0,0,r);var u=window.document,l=u.head||u.getElementsByTagName("head")[0];hj.scriptDomain=e;var f=u.createElement("script");f.async=1,f.src=hj.scriptDomain+t,f.charset="utf-8",l.appendChild(f),c.revision="8d4c0f4",window.hjBootstrap=c},window.hjBootstrap("https://script.hotjar.com/","modules.f9859f007fa31a6b8e2b.js","3345114"),hj.metrics.timeEnd("resource-blocking-time",{tag:{resource:"hotjar-js"},start:v,type:"lab"}),window.hjLazyModules=window.hjLazyModules||{SURVEY_V2:{js:"survey-v2.0ddb0fa07636a76871ca.js"},SURVEY_BOOTSTRAPPER:{js:"survey-bootstrapper.83b76e3a22d55aa832f6.js"},SURVEY_ISOLATED:{js:"survey-isolated.9233b6b63595d34a9dcd.js"},HEATMAP_RETAKER:{js:"heatmap-retaker.03eedc48703630f6a41e.js"},SURVEY_INVITATION:{js:"survey-invitation.4301c9afc1e053cda95a.js"},NOTIFICATION:{js:"notification.0ed6d753395a17d0055b.js"},INCOMING_FEEDBACK:{js:"incoming-feedback.b4ae0953d9108b5563ba.js"},PREACT_INCOMING_FEEDBACK:{js:"preact-incoming-feedback.195af60095c377688c8c.js"},SENTRY:{js:"sentry.58c81e3e25532810f6fd.js"},BROWSER_PERF:{js:"browser-perf.28a8c6b22b3c0474c577.js"}}}();