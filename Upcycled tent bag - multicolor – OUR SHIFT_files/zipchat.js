(function() {
  function loadWidget() {
    var scriptTag = document.querySelector('script[src*="zipchat.js"]');
    var widget_token = new URL(scriptTag.src).searchParams.get('id');
    
    var fetchUrl = scriptTag.src.replace('/widget/zipchat.js?id=' + widget_token, '/widget_data?widget_token=' + widget_token);

    fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        var widgetData = data;
        var widgetCorner = widgetData.widget_position_corner;
        var widgetHorizontal = widgetData.widget_horizontal;
        var widgetVertical = widgetData.widget_vertical;
        var widgetSize = widgetData.widget_size;

        if (widgetData.widget == false) {
          return
        }
        
        const sizeMap = {
          'small': 0,
          'medium': 10,
          'large': 20
        };
        const chatBubbleSizeDifference = sizeMap[widgetSize] || 0;


        var chatPreviewMessage = document.createElement('div');
        chatPreviewMessage.setAttribute('id', 'chat-preview-message');
        chatPreviewMessage.style.paddingTop = '10px';
        chatPreviewMessage.style.paddingBottom = '10px';
        chatPreviewMessage.style.fontFamily = 'sans-serif;'
        chatPreviewMessage.style.color = 'black'
        chatPreviewMessage.style.paddingLeft = '16px';
        chatPreviewMessage.style.paddingRight = '16px';
        chatPreviewMessage.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 4px 8px 0px';
        const horizontalPreview = `${widgetHorizontal}px`;
        if (widgetCorner.includes('right')) {
          chatPreviewMessage.style.right = horizontalPreview;
        } else {
          chatPreviewMessage.style.left = horizontalPreview;
        }
        const verticalPreview = `${widgetVertical + 55 + chatBubbleSizeDifference}px`;
        if (widgetCorner.includes('bottom')) {
          chatPreviewMessage.style.bottom = verticalPreview;
        } else {
          chatPreviewMessage.style.top = verticalPreview;
        }
        chatPreviewMessage.style.width = '300px';
        chatPreviewMessage.style.maxWidth = '300px';
        chatPreviewMessage.style.backgroundColor = 'white';
        chatPreviewMessage.style.height = 'auto';
        chatPreviewMessage.style.position = 'fixed';
        chatPreviewMessage.style.zIndex = '99999999999';
        chatPreviewMessage.style.opacity = "0"
        chatPreviewMessage.style.borderRadius = "12px"
        chatPreviewMessage.style.transition = "transform 0.3s cubic-bezier(0, 1.2, 1, 1), opacity 0.2s ease-out";

        const imageElement = widgetData.photo_url ? `
        <div style="flex-shrink: 0;width: 32px;height: 32px;">
            <img id="photo-preview" alt="Photo preview" style="border-radius: 9999px; max-height: 32px;" width="32" height="32" data-chat-bot-show-target="photoSmallPreview" src="${widgetData.photo_url}">
        </div>` : '';

        const gapStyle = widgetData.photo_url ? 'gap: 12px;' : '';

        chatPreviewMessage.innerHTML = `
              <div style="">
    <div id="brand-name" style="font-weight: bold; padding: 4px 0; background-color: white; cursor: pointer; font-family: sans-serif;">
        <div style="display: flex; align-items: center; ${gapStyle}; margin-bottom: 4px;">
            ${imageElement}
            <div style="flex: 1;">
                <div style="line-height: 16px;">
                    <p style="letter-spacing: 0px; margin: 0; font-size: 14px; font-weight: 600;" data-chat-bot-show-target="brandNameSmallPreview">${widgetData.brand_name}</p>
                    <div style="display: inline-flex; align-items: center;">
                        <div style="display: block; width: 8px; height: 8px; background-color: #22c55d; border-radius: 9999px; margin-right: 4px;"></div>
                        <p style="margin: 0; font-weight: 300; font-size: 12px;">Active</p>
                    </div>
                </div>
            </div>
            <div style="line-height: 16px; display: flex; color: #bdbdbd;justify-content: flex-end; cursor: pointer;" id="close-preview-message">
                <svg style="width: 20px; height: 20px; top: 16px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" style="fill:none;"></path>
                </svg>
            </div>
        </div>
    </div>

    <div style="line-height: 16px; letter-spacing: 0.2px; font-family: sans-serif; color: #6B7280; cursor: pointer; font-size: 12px;" data-chat-bot-show-target="welcomeSmallPreviewMessageText">${widgetData.preview_welcome_message}</div>
</div>

        
        `


        
        var scriptTag = document.querySelector('script[src*="zipchat.js"]');
        // Get the ID parameter value from the script tag's src attribute
        var widget_token = new URL(scriptTag.src).searchParams.get('id');

        var chatbotUrl = scriptTag.src.replace('/widget/zipchat.js?id=' + widget_token, '/widget');
        
        // Case when shopify is loading the script tag, we need to remove the &shop parameter
        if (chatbotUrl.includes('&shop')) {
            chatbotUrl = chatbotUrl.substring(0, chatbotUrl.indexOf('&shop'));
        }
        
        // Append the token to the chatbot URL
        function generateRandomString(length) {
          var result = '';
          var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          return result;
        }

        var visitor_token = localStorage.getItem('visitor_token');
        if (!visitor_token) {
          visitor_token = generateRandomString(20);
          localStorage.setItem('visitor_token', visitor_token);
        }

        var currentUrl = window.location.href;

        chatbotUrl += '?widget_token=' + encodeURIComponent(widget_token) + '&visitor_token=' + encodeURIComponent(visitor_token) + '&current_url=' + encodeURIComponent(currentUrl);

        // Create an iframe to load the chatbot interface
        var chatbotIframe = document.createElement('iframe');
        chatbotIframe.setAttribute('id', 'zipchat-iframe');
        chatbotIframe.classList.add("zipchat-iframe");
        chatbotIframe.src = chatbotUrl;
        chatbotIframe.style.maxheight = '700px';
        chatbotIframe.style.border = 'none';
        chatbotIframe.style.opacity = "0"
        chatbotIframe.style.transform = "scale(0)";
        chatbotIframe.style.height = `min(704px, 100% - ${84 + widgetVertical}px - ${chatBubbleSizeDifference}px)`;

        chatbotIframe.style.position = 'fixed';
        chatbotIframe.style.pointerEvents = 'none';
        chatbotIframe.style.fontSize = '16px';
        chatbotIframe.style.boxShadow = "0 6px 6px 0 rgba(0,0,0,.02),0 8px 24px 0 rgba(0,0,0,.12)";
        chatbotIframe.style.transformOrigin = widgetCorner.replace('-',' ');
        chatbotIframe.style.transition = "transform 0.3s cubic-bezier(0, 1.2, 1, 1), opacity 0.2s ease-out";

        // Check if the screen width is less than or equal to 768px (typical breakpoint for mobile devices)
        if (window.innerWidth <= 768) {
          chatbotIframe.style.top = '0';
          chatbotIframe.style.bottom = '0';
          chatbotIframe.style.width = '100%';
          chatbotIframe.style.height = '100%';
          chatbotIframe.style.zIndex = '99999999999';
        } else {
          const horizontal = `${widgetHorizontal}px`;
          if (widgetCorner.includes('right')) {
            chatbotIframe.style.right = horizontal;
          } else {
            chatbotIframe.style.left = horizontal;
          }

          const vertical = `${widgetVertical + 60 + chatBubbleSizeDifference}px`;

          if (widgetCorner.includes('bottom')) {
            chatbotIframe.style.bottom = vertical;
          } else {
            chatbotIframe.style.top = vertical;
          }

          chatbotIframe.style.width = '400px';
          chatbotIframe.style.zIndex = '10000';
          chatbotIframe.style.borderRadius = "0.75rem"
        }

        // Create the chat bubble container
        var chatBubbleContainer = document.createElement('div');
        chatBubbleContainer.setAttribute('id', 'widget-chat-container');
  
        // chatBubbleContainer.style.opacity = "0"

        // Create the chat bubble button
        var chatBubbleButton = document.createElement('div');
        chatBubbleButton.setAttribute('id', 'widget-chat-button');
        chatBubbleButton.style.position = 'fixed';
        chatBubbleButton.style.width = `${50 + chatBubbleSizeDifference}px`;
        chatBubbleButton.style.height = `${50 + chatBubbleSizeDifference}px`;
        chatBubbleButton.style.borderRadius = '50%';
        chatBubbleButton.style.backgroundColor = widgetData.color;
        chatBubbleButton.style.boxShadow = 'rgba(0, 0, 0, 0.2) 0px 4px 8px 0px';
        chatBubbleButton.style.cursor = 'pointer';
        chatBubbleButton.style.zIndex = '999999999';
        chatBubbleButton.style.transition = 'all 0.2s ease-in-out 0s';

        let horizontalPosition = widgetCorner.includes("right") ? "right" : "left";
        let verticalPosition = widgetCorner.includes("bottom") ? "bottom" : "top";

        chatBubbleButton.style[horizontalPosition] = `${widgetHorizontal}px`;
        chatBubbleButton.style[verticalPosition] = `${widgetVertical}px`;

        var chatBubbleIcon = document.createElement('div');
        chatBubbleIcon.style.display = 'flex';
        chatBubbleIcon.style.alignItems = 'center';
        chatBubbleIcon.style.justifyContent = 'center';
        chatBubbleIcon.style.width = '100%';
        chatBubbleIcon.style.height = '100%';
        chatBubbleIcon.style.zIndex = '999999999';


        // dynamically change the svgs size based on the widget size
        const svgSizeMap = {
          'small': 0,
          'medium': 6,
          'large': 12
        };
        const svgSizeDifference = svgSizeMap[widgetSize] || 0;
        const baseSize = 24;
        const newSize = baseSize + svgSizeDifference;

        // chat svg icon
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('stroke-width', '1.5');
        svg.setAttribute('stroke', '#ffffff');
        svg.setAttribute('class', 'w-6 h-6 text-white');
        svg.setAttribute('width', `${newSize}px`);
        svg.setAttribute('height', `${newSize}px`);
        svg.setAttribute('style', `width:${newSize}px;height:${newSize}px;fill:none;`);

        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        path.setAttribute('d', 'M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337');
        svg.setAttribute('fill', 'none');

        svg.appendChild(path);

        // close svg icon
        var crossSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        crossSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        crossSvg.setAttribute("fill", "none");
        crossSvg.setAttribute("viewBox", "0 0 24 24");
        crossSvg.setAttribute("stroke-width", "1.5");
        crossSvg.setAttribute("stroke", "#ffffff");
        crossSvg.setAttribute("class", "w-6 h-6 text-white");
        crossSvg.setAttribute("width", `${newSize}px`);
        crossSvg.setAttribute("height", `${newSize}px`);
        crossSvg.setAttribute('style', `width:${newSize}px;height:${newSize}px;fill:none;`);

        var crossPath1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        crossPath1.setAttribute("stroke-linecap", "round");
        crossPath1.setAttribute("stroke-linejoin", "round");
        crossPath1.setAttribute("d", "M6 18L18 6M6 6l12 12");

        crossSvg.appendChild(crossPath1);


        // Append the SVG to the chat bubble icon
        chatBubbleIcon.appendChild(svg);
        // Appen the cross svg that we will hide and show 
        crossSvg.style.display = "none";
        chatBubbleIcon.appendChild(crossSvg)

        // Append the chat bubble icon to the chat bubble button
        chatBubbleButton.appendChild(chatBubbleIcon);

        // Append the chat bubble button to the user's website
        document.body.appendChild(chatBubbleContainer);

        chatBubbleContainer.appendChild(chatBubbleButton);


        // Append the iframe to the user's website
        document.body.appendChild(chatbotIframe);

        document.querySelector("#widget-chat-button").addEventListener("mousedown", function (event) {
          event.stopPropagation();
          document.getElementById("widget-chat-button").style.transform = "scale(0.7)";
        });

        document.querySelector("#widget-chat-button").addEventListener("mouseup", function (event) {
          event.stopPropagation();
          document.getElementById("widget-chat-button").style.transform = "scale(1)";
        });

        if (!localStorage.getItem('chatPreviewMessageHidden') && widgetData.show_preview_welcome) {
          chatBubbleContainer.appendChild(chatPreviewMessage);

          chatBubbleContainer.querySelector('#chat-preview-message').addEventListener("click", function (event) {
            event.stopPropagation();
            chatPreviewMessage.style.transform = "scale(0)";
            chatPreviewMessage.style.opacity = "0";
            document.querySelector("#widget-chat-button").click()
          });

          function showChatPreviewMessage() {
            chatPreviewMessage.style.transform = "scale(1)";
            chatPreviewMessage.style.opacity = "1";
            chatPreviewMessage.style.display = "";
          }

          function hideChatPreviewMessage() {
            chatPreviewMessage.style.transform = "scale(0)";
            chatPreviewMessage.style.opacity = "0";
            chatPreviewMessage.remove()
          }
          chatBubbleContainer.querySelector('#close-preview-message').addEventListener("click", function (event) {
            event.stopPropagation();
            hideChatPreviewMessage();
            // event.stopPropagation();

            // Set the localStorage flag to prevent showing the chat preview message again
            localStorage.setItem('chatPreviewMessageHidden', 'true');
          });
          
          setTimeout(() => {
          showChatPreviewMessage();

          }, 2000);
        }

        // Opening closing the chatbot when cliking on the widget button
        document.querySelector("#widget-chat-button").addEventListener("click", function (event) {
          event.stopPropagation();
          var iframe = document.getElementById("zipchat-iframe");
          if (chatBubbleContainer.querySelector("#close-preview-message")) {
            chatBubbleContainer.querySelector('#close-preview-message').click()
          }
          

          if (iframe.style.opacity == 1) {
          document.getElementById("zipchat-iframe").style.transform = "scale(0)";
          document.getElementById("zipchat-iframe").style.opacity = "0";
          document.getElementById("zipchat-iframe").style.pointerEvents = 'none';
          if (window.innerWidth <= 768) {
            toggleBodyScroll(true);
          }
          // Swap SVGs
          svg.style.display = "block";
          crossSvg.style.display = "none";
          } else {
            document.getElementById("zipchat-iframe").style.transform = "scale(1)";
            document.getElementById("zipchat-iframe").style.opacity = "1";
            document.getElementById("zipchat-iframe").style.pointerEvents = 'all';
            iframe.contentWindow.postMessage(
              { action: "scrollToBottom", origin: window.location.origin },
              "*"
            );
            if (window.innerWidth <= 768) {
              toggleBodyScroll(false);
              document.body.style.position = "static";
              document.body.style.inset = "0px";
              document.body.style.margin = "0px";
            }
            // Swap SVGs
            svg.style.display = "none";
            crossSvg.style.display = "block";
          }
        });


        // On mobile, I added a 'x' to close the chatbot, because it's in the iframe, I need to do a post message
        window.addEventListener('message', function(event) {
          if (event.origin !== event.data.origin) {
            return;
          }
          if (event.data.action === 'close-iframe') {
            var iframe = document.getElementById("zipchat-iframe");
            document.getElementById("zipchat-iframe").style.transform = "scale(0)";
            document.getElementById("zipchat-iframe").style.opacity = "0";
            document.getElementById("zipchat-iframe").style.pointerEvents = 'none';

            svg.style.display = "block";
            crossSvg.style.display = "none";
            toggleBodyScroll(true)
            document.body.style.position = "";
            document.body.style.inset = "";
            document.body.style.margin = "";
          }
          if (event.data.action === 'remove-iframe') {
            document.getElementById("zipchat-iframe").remove()
            document.getElementById("widget-chat-button").remove()
          }

        });

        // If the clicked element is neither the chat button nor the iframe itself, close the iframe.
        window.addEventListener("click", function(event) {
          var iframe = document.getElementById("zipchat-iframe");
          var chatButton = document.getElementById("widget-chat-button");
          if (event.target !== chatButton && event.target !== iframe) {
            document.getElementById("zipchat-iframe").style.transform = "scale(0)";
            document.getElementById("zipchat-iframe").style.opacity = "0";
            document.getElementById("zipchat-iframe").style.pointerEvents = 'none';
            svg.style.display = "block";
            crossSvg.style.display = "none";
            toggleBodyScroll(true)
          }
        });

        function toggleBodyScroll(enable) {
          if (enable) {
            document.body.style.overflow = '';
          } else {
            document.body.style.overflow = 'hidden';
          }
        }

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  if (document.readyState === 'loading') {  
    // If the document is still loading, wait for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', loadWidget);
  } else {  
    // If the document has already finished loading, we can run the function now
    loadWidget();
  }
})();

