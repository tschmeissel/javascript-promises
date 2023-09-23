/**
 * a promise might be create by its constructor or static API methods
 * if a promise calls resolve or reject in the executor functions it is thenable
 * await / async are a more elegant way to avoid a then tree
 *
 * Q & A
 * Ist ein Promise pending weil die Ausführung noch läuft oder weil es noch nicht awaited wurde?
 *  Ein promise ist pending, solange kein resolve oder reject in der executor function aufgerufen wurde.
 *
 * Does await get the same result value the success callback handler gets when used?
 *  yes
 *
 * Woher weiß ich 8n welchem Status sich ein Promis befindet?
 *  debuggen
 *
 * Was passiert bei then oder await, wenn kein resolve oder reject Promise ausgeführt wird?
 *  Das Promise bleibt im Status "pending".
 *  Bei then wird keine entsprechende call back Funktion aufgerufen.
 *  Bei await bleibt die Ausführung hängen.
 *
 * Was gibt es bei einem Promise zu catchen?
 *  Der failure callback handler kann then(...) oder separat in catch(...) überbgeben werden
 *
 * Wie bekomme ich bei await ein reject mit?
 *  mit try / catch
 *
 * Was kann ich mit dem 2. promise nach .then machen?
 *  Eine Kette von asynchronen Aufrufen bilden, bei denen die Ausführungsreihenfolge wichtig ist.
 *
 * Was kann die Promise API noch so Schickes für mich tun?
 * Was bedeuted einen Wert zu einem Promise zu machen?
 * Kann man ein Promise nachträglich resolven?
 *  https://stackoverflow.com/questions/54723849/why-and-when-to-use-promise-resolveAfter2Seconds
 *
 * https://medium.com/@ramsunvtech/promises-of-promise-part-1-53f769245a53
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises?retiredLocale=de
 * https://www.promisejs.org/api/
 * 
 * https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8
 * https://javascript.info/async-await
 * https://www.youtube.com/watch?v=2d7s3spWAzo
 * https://dexie.org/docs/Tutorial/Best-Practices
 */

const basicPromiseHandling = () => {
  const promise = new Promise((resolve, reject) => {
    // the executor function gets called immideately even before creation of the promise finishes
    const number = Math.random();
    console.log('number', number);
    if (number > 0.5) {
      resolve('SUCCESS');
    } else {
      reject('FAILURE');
    }
  });

  function successCallback(result) {
    console.log('success callback handler got: ' + result);
    return result;
  }

  function failureCallback(error) {
    console.log('failure callback handler got: ' + error);
    return error;
  }

  const promise2 = promise.then(successCallback, failureCallback)
  // same as...
  // const promise2 = promise.then(successCallback).catch(failureCallback);

  // promise2 is pending after promise got resolved and holds the value of the call back handler
  promise2.then(result => {
    console.log("result 2:", result)
  });

  // alternatively use async await
  /*   (async () => {
    try {
      const result = await promise;
      console.log('await got ', result);

    } catch (error) {
      failureCallback(error);
    }
  })(); */
};

//basicPromiseHandling();

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function awaitPromiseReturningFunction() {
  console.log('calling');

  //const result = await resolveAfter2Seconds();

  //const resultPromise = resolveAfter2Seconds();
  //const result = await resultPromise;
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved after 2 s');
    }, 2000);
  });
  console.log(result);
  // expected output: "resolved"
}

//awaitPromiseReturningFunction();

//
// promise API games
//

const promiseAPIGames = () => {
  var directPromiseValue = Promise.resolve('Success');
  directPromiseValue.then((result) => {
    console.log('resolved with', result);
  });
};

//promiseAPIGames();
