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