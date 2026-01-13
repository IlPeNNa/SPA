import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AtletaService } from '../../servizi/atleta.service';
import { Atleta } from '../../modelli/atleta.model';

@Component({
  selector: 'app-lista-atleti',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-atleti.component.html',
  styleUrls: ['./lista-atleti.component.css']
})
export class ListaAtletiComponent implements OnInit {
  atleti: Atleta[] = [];

  constructor(private atletaService: AtletaService) {}

  ngOnInit() {
    this.atletaService.getAllAtleti().subscribe(atleti => {
      this.atleti = atleti;
    });
  }
}
