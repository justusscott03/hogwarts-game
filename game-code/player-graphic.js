//translate(-50, -150);
scale(2);

background(0, 0, 0, 0);

noStroke();

//Head
fill(181, 130, 42);
ellipse(50, 50, 50, 50);

//Eyes
fill(255);
ellipse(55, 50, 10, 20);
ellipse(71, 50, 7, 20);

fill(0);
ellipse(56.5, 50, 7, 14);
ellipse(72, 50, 5, 14);

//Head shading
fill(0, 0, 0, 30);
beginShape();
    vertex(65, 30);
    bezierVertex(79, 40, 76, 55, 70, 65);
    bezierVertex(60, 78, 45, 76, 35, 70);
    bezierVertex(35, 70, 70, 70, 70, 35);
endShape();

//Hat
fill(25);
beginShape();
    vertex(10, 10);
    vertex(30, 11);
    vertex(50, 18);
    vertex(60, 20);
    vertex(70, 25);
    vertex(23, 62);
    vertex(23, 48);
    vertex(25, 36);
    vertex(22, 26);
    vertex(20, 21);
endShape();

fill(0);
beginShape();
    vertex(73, 40);
    vertex(80, 30);
    vertex(75, 25);
    vertex(65, 23);
    vertex(50, 30);
    vertex(35, 40);
    vertex(25, 50);
    vertex(20, 65);
    vertex(24, 68);
    vertex(31, 67);
    vertex(35, 57);
    vertex(45, 45);
    vertex(60, 35);
    vertex(65, 35);
    vertex(71, 37);
endShape();

//Robes
fill(100);
//quad(25, 75, 75, 75, 90, 150, 10, 150);

//Hand
fill(181, 130, 42);
ellipse(40, 117, 17, 17);

//Hand shading
fill(0, 0, 0, 30);

//Arm
fill(25);
arc(40, 85, 20, 20, 180, 360);
rect(30, 85, 20, 30);
arc(40, 115, 20, 5, 0, 180);

//Arm shading
fill(0);
beginShape();
    vertex(40, 75);
    bezierVertex(45, 80, 45, 85, 45, 90);
    vertex(45, 110);
    bezierVertex(45, 113, 43, 116, 40, 117.5);
    bezierVertex(44, 117, 48, 117, 50, 115);
    vertex(50, 85);
    bezierVertex(50, 85, 50, 75, 40, 75);
endShape();
