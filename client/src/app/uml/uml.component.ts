import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uml',
  templateUrl: './uml.component.html',
  styleUrls: ['./uml.component.scss']
})
export class UmlComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addRow(table,propriete){
  	console.log("tu entre la table "+table.value+"et la colonne"+propriete.value)
  }
}
