const showDebugMsg = false;

/*
  Levels are: 

  0 info
  1 warn
  2 error 
*/

const levelThreshold = 2;



class DebugHelper{

  static print(className, message, level){

    var lvl = typeof(level) === 'undefined' ? 0 : level;

    if(!showDebugMsg || level < levelThreshold)
      return;

    console.log("---------------------------");
    console.log("[" + className + "]" + message);

  }

  static printObj(className, obj, level){

    var lvl = typeof(level) === 'undefined' ? 0 : level;

    if(!showDebugMsg || level < levelThreshold)
      return;

    console.log(obj);

  }

  static get levelInfo(){
    return 0;
  }

  static get levelWarn(){
    return 1;
  }

  static get levelError(){
    return 2;
  }

}

export default DebugHelper;