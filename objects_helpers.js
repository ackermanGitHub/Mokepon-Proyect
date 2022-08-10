// Helpers
function isObject(subject) {
    return typeof subject == "object";
}
function isArray(subject) {
    return Array.isArray(subject);
}
function requiredParam(param) {
    throw new Error(param + " es obligatorio");
}

function LearningPath({
    name = requiredParam("name"),
    courses = [],
}) {
    this.name = name;
    this.courses = courses;
}
function Student({
    name = requiredParam("name"),
    email = requiredParam("email"),
    age,
    twitter,
    instagram,
    facebook,
    approvedCourses = [],
    learningPaths = [],
} = {}) {
    this.name = name;
    this.email = email;
    this.age = age;
    this.socialMedia = {
        twitter,
        instagram,
        facebook,
    };
    this.approvedCourses = approvedCourses;

    const private = {
        "_learningPaths": [],
    };

    Object.defineProperty(this, "learningPaths", {
        get(){
            return private["_learningPaths"];
        },
        set(newLP) {
            if(newLP instanceof LearningPath) {
                private["_learningPaths"].push(newLP);         
            } else {
                console.warn("Alguno de los LPs no es una instancia del prototipo LearninPaths");
            }
        },
    });
          
    for(learningPathIndex in learningPaths) {
        this.learningPaths = learningPaths[learningPathIndex];
    }
}

// Best Objects Copier
function deepCopy(subject) {
    let copy;
    const subjectIsArray = isArray(subject);
    const subjectIsObject = isObject(subject);

    if (subjectIsArray) {
        copy = [];
    } else if (subjectIsObject) {
        copy = {};
    } else {
        return subject;
    }

    for (key in subject) {
        const keyIsObject = isObject(subject[key])
        if (keyIsObject) {
            copy[key] = deepCopy(subject[key]);
        } else {
            if (subjectIsArray) {
                copy.push(subject[key]);
            } else {
                copy[key] = subject[key];
            }
        }
    }
    return copy;
}

// make a sound beep
const myAudioContext = new AudioContext();
function beep(duration, frequency, volume){
    return new Promise((resolve, reject) => {
        // Establecer la duración predeterminada si no se proporciona
        duration = duration || 200;
        frequency = frequency || 440;
        volume = volume || 100;

        try{
            let oscillatorNode = myAudioContext.createOscillator();
            let gainNode = myAudioContext.createGain();
            oscillatorNode.connect(gainNode);

            // Establecer la frecuencia del oscilador en hercios
            oscillatorNode.frequency.value = frequency;

            // Establecer el tipo de oscilador
            oscillatorNode.type= "square";
            gainNode.connect(myAudioContext.destination);

            // Establecer la ganancia al volumen
            gainNode.gain.value = volume * 0.01;

            // Inicie el audio con la duración deseada
            oscillatorNode.start(myAudioContext.currentTime);
            oscillatorNode.stop(myAudioContext.currentTime + duration * 0.001);

            // Resuelve la promesa cuando se acabe el sonido.
            oscillatorNode.onended = () => {
                resolve();
            };
        }catch(error){
            reject(error);
        }
    });
}