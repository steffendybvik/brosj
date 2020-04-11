export class Board {
    constructor() {
        this.author = 'unknown';
        this.title = 'new board';
        this.color = 'teal';
    }
}

export class Swimlane {
    constructor() {
        this.title = "new swimlane";
        this.color = "cyan";
    }
}

export class Column {
    constructor() {
        this.title = "new column";
    }
}

export class Task {
    constructor() {
        this.title = "new task";
        this.priority = "normal";
        this.created = new Date();
    }
}