import DebugHelper from './DebugHelper.js';

class WsTouch{

  constructor(url, port, element){

    this.url = url;
    this.port = port;
    this.element = element;

    this.connection = new WebsocketConnection(
      this.url,
      this.port,
      {
        open: this.onOpen.bind(this),
        close: function () {},
        message: this.onMessage.bind(this)
      }, {
        autoConnect: true,
        autoReconnect: true
      }
    );

  }

  onOpen(connection) {

    DebugHelper.print("WsTouch", "Connection open to " + this.url + ":" + this.port);

  }

  onMessage(connection, message) {

    switch(message.type) {
      case 'start':
      case 'move':
      case 'end':
        
        DebugHelper.print("WsTouch", "Get " + message.type + " message:");
        DebugHelper.printObj("WsTouch", message);
        DebugHelper.print("WsTouch", "NormalizedValue:");
        DebugHelper.printObj("WsTouch", this.convertNormalizedData(message));

        WsTouch.sendTouchEvent(this.convertNormalizedData(message), this.element, "touch" + message.type);

        break;

      default:

        DebugHelper.print("WsTouch", "Undefined type message " + message.type);

        break;
    }

  }

  convertNormalizedData(fromWS){

    return {

      id: fromWS.id,
      x: fromWS.x * this.element.width + 300,
      y: fromWS.y * this.element.height + 52,
      size: 100 * fromWS.size,
      intensity: 10 * fromWS.intensity

    }

  }

  static sendTouchEvent(dataFromWS, element, eventType) {

    const touchObj = new Touch({
      identifier: dataFromWS.id,
      target: element,
      clientX: dataFromWS.x,
      clientY: dataFromWS.y,
      pageX: dataFromWS.x,
      pageY: dataFromWS.y,
      radiusX: dataFromWS.size,
      radiusY: dataFromWS.size,
      rotationAngle: 0,
      force: dataFromWS.intensity,
    });

    const touchEvent = new TouchEvent(eventType, {
      cancelable: true,
      bubbles: true,
      touches: [touchObj],
      targetTouches: [],
      changedTouches: [touchObj],
      shiftKey: true,
    });

    element.dispatchEvent(touchEvent);

  }

}

export default WsTouch;