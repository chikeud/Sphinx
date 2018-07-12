
/**
 * Reads an uploaded file
 *
 * @param input
 */
export function readFiles(input) {
  const LENGTH = input.files.length;

  if(!LENGTH) return;

  let reader = new FileReader();
  let result = [];
  let count = 0;

  return new Promise(function(resolve, reject){
    let readNextFile = () => {
      while(count < LENGTH && !(/\.(jpe?g|png|gif)$/i.test(input.files[count].name))){
        count++;
      }

      if(count < LENGTH) {
        reader.readAsDataURL(input.files[count]);
      }
      else{
        input.value = "";
        resolve(result);
      }
    };

    reader.addEventListener("load", () => {
      result.push({
        file: input.files[count],
        url: reader.result
      });
    });

    reader.addEventListener("loadend", () => {
      count++;
      readNextFile();
    });

    reader.addEventListener("error", () => {
      reject(reader.error);
    });

    readNextFile();
  });
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
