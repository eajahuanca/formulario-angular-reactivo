import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdministradorDistribuidor, Cajero, Concepto, Plataforma, Status, TipoPago } from 'src/app/models/consultas.model';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit, OnDestroy{

  private dataSubscription: Subscription | undefined;
  private adminSubscription: Subscription | undefined;
  private cajeroSubscription: Subscription | undefined;
  private tipopagoSubscription: Subscription | undefined;
  private statusSubscription: Subscription | undefined;
  private plataformaSubscription: Subscription | undefined;
  private conceptoSubscription: Subscription | undefined;
  public formConsulta: FormGroup;
  public dataAdmin: AdministradorDistribuidor[] = [] as AdministradorDistribuidor[];
  public dataCajero: Cajero[] = [] as Cajero[];
  public dataTipoPago: TipoPago[] = [] as TipoPago[];
  public dataStatus: Status[] = [] as Status[];
  public dataPlataforma: Plataforma[] = [] as Plataforma[];
  public dataConcepto: Concepto[] = [] as Concepto[];

  constructor(
    private consultaService: ConsultasService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ){
    this.formConsulta = new FormGroup({});
  }

  ngOnInit(): void {
    this.generarFormBuilder();
    this.getAdministradores();
    this.getCajero();
    this.getTipoPago();
    this.getStatus();
    this.getPlataforma();
    this.getConcepto();
  }

  public generarFormBuilder(){
    this.formConsulta = this.fb.group({
      fecha_inicial     : ['', [Validators.required]],
      fecha_final       : ['', [Validators.required]],
      admin_distribuidor: ['', [Validators.required]],
      cajero            : ['', [Validators.required]],
      tipo_pago         : ['', [Validators.required]],
      estatus           : ['', [Validators.required]],
      plataforma        : ['', [Validators.required]],
      concepto          : ['', [Validators.required]]
    });
  }

  public getAdministradores(){
    this.adminSubscription = this.consultaService.getAdministradores().subscribe({
      next: (response) => {
        this.dataAdmin = response;
      }, error: (error) => {
        this.dataAdmin = [];
      }, complete: () => {}
    });
  }

  public getCajero(){
    this.cajeroSubscription = this.consultaService.getCajeros().subscribe({
      next: (response) => {
        this.dataCajero = response;
      }, error: (error) => {
        this.dataCajero = [];
      }, complete: () => {}
    });
  }

  public getTipoPago(){
    this.tipopagoSubscription = this.consultaService.getTipoPago().subscribe({
      next: (response) => {
        this.dataTipoPago = response;
      }, error: (error) => {
        this.dataTipoPago = [];
      }, complete: () => {}
    });
  }

  public getStatus(){
    this.statusSubscription = this.consultaService.getStatus().subscribe({
      next: (response) => {
        this.dataStatus = response;
      }, error: (error) => {
        this.dataStatus = [];
      }, complete: () => {}
    });
  }

  public getPlataforma(){
    this.plataformaSubscription = this.consultaService.getPlataforma().subscribe({
      next: (response) => {
        this.dataPlataforma = response;
      }, error: (error) => {
        this.dataPlataforma = [];
      }, complete: () => {}
    });
  }

  public getConcepto(){
    this.conceptoSubscription = this.consultaService.getConcepto().subscribe({
      next: (response) => {
        this.dataConcepto = response;
      }, error: (error) => {
        this.dataConcepto = [];
      }, complete: () => {}
    });
  }

  public accionClickConsultar(){
    if (this.formConsulta.valid){
      this.toastr.success(this.formConsulta.value, 'VALORES DEL FORM');
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe();
    this.adminSubscription?.unsubscribe();
    this.cajeroSubscription?.unsubscribe();
    this.tipopagoSubscription?.unsubscribe();
    this.statusSubscription?.unsubscribe();
    this.plataformaSubscription?.unsubscribe();
    this.conceptoSubscription?.unsubscribe();
  }

}
