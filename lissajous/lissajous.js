class Dot {
    //Class to hold the data for each 'square' on the canvas
    constructor(i, j, color) {
        const min_hw = min(height, width);
        this.dot_size = min_hw / 11;

        this.color_index = 0;
        this.color = color;

        this.mid_x = (i + 1) * min_hw / 9;
        this.mid_y = (j + 1) * min_hw / 9;
        this.x_off, this.y_off = 0;
        this.angle = 90;

        this.points = new Array(400);
    };

    calculate_x_y() {
        //Calculate the position of the white dot to 2 decimal places
        //Note1: 0.5*this.dot_size is equals to the radius
        //Note2: round(n*100)*0.01 rounds n to 2 decimals
        this.x_off = -round(0.5 * this.dot_size * cos(-this.angle) * 100) * 0.01;
        this.y_off = round(0.5 * this.dot_size * sin(-this.angle) * 100) * 0.01;
    };

    draw_stroke() {
        //Only make the stroke of the circle when it is on the size
        noFill();
        strokeWeight(4);

        if (this.color != 0) {
            stroke(this.color);
            ellipse(this.mid_x, this.mid_y, this.dot_size);
        }
    };

    draw_dot() {
        //Draw the little white dot
        stroke(255);
        fill(255);
        ellipse(this.mid_x + this.x_off, this.mid_y + this.y_off, 3);
    };
};

function poly_line(ar, color) {
    /**
     * Make a line throug all the points in the 'ar' array.
     */
    noFill();
    stroke(color);
    strokeWeight(1);

    beginShape();
    for (n = 0; n < ar.length; n++) {
        if (ar[n]) {
            vertex(ar[n][0], ar[n][1]);
        }
    }
    endShape();
};


function setup() {
    //Define rainbow colors
    colors = [color(0, 0, 0),
        color(255, 0, 0),
        color(255, 128, 0),
        color(255, 255, 0),
        color(0, 255, 0),
        color(0, 255, 255),
        color(0, 0, 255),
        color(255, 0, 255)
    ];

    angleMode(DEGREES);
    min_hw = min(windowWidth, windowHeight)
    createCanvas(min_hw, min_hw);


    //Make a 8x8 array for all the circle data
    drawings = new Array(8);

    for (index = 0; index < drawings.length; ++index) {
        drawings[index] = new Array(8);
    }

    //Fill the array with the objects including indexes and color
    for (i = 0; i < drawings.length; i++) {
        for (j = 0; j < drawings.length; j++) {
            drawings[i][j] = new Dot(i, j, 0);
            if (i == 0) {
                drawings[0][j].color = colors[j];
                drawings[0][j].color_index = j;
            } else if (j == 0) {
                drawings[i][0].color = colors[i];
                drawings[i][0].color_index = i;
            } else {
                drawings[i][j].color = color(red(colors[j]) / 2 + red(colors[i]) / 2, green(colors[j]) / 2 + green(colors[i]) / 2, blue(colors[j]) / 2 + blue(colors[i]) / 2)

            }
        }
    }
};

function draw_points(drawings, x, y) {
    drawings[x][y].calculate_x_y()
    drawings[x][y].angle += drawings[x][y].color_index;
    drawings[x][y].draw_stroke();
    drawings[x][y].draw_dot();
}

function draw() {
    background(0);

    //Circles on the side
    for (k = 1; k < drawings.length; k++) {
        draw_points(drawings, 0, k)
        draw_points(drawings, k, 0)
    }

    //Shapes in the middle
    for (i = 1; i < drawings.length; i++) {
        for (j = 1; j < drawings.length; j++) {
            drawings[i][j].x_off = drawings[0][i].x_off;
            drawings[i][j].y_off = drawings[j][0].y_off;
            drawings[i][j].draw_dot();
            let x = drawings[i][j].mid_x + drawings[0][i].x_off;
            let y = drawings[i][j].mid_y + drawings[j][0].y_off;

            //Add a point to the array with points for the polyline
            //and remove the last point from that array.
            drawings[i][j].points.unshift([x, y]);
            drawings[i][j].points.pop()
            poly_line(drawings[i][j].points, drawings[i][j].color);
        }
    }
}