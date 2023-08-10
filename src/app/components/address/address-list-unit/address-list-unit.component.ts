import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Address } from 'src/app/models/address';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-address-list-unit',
  templateUrl: './address-list-unit.component.html',
  styleUrls: ['./address-list-unit.component.css']
})
export class AddressListUnitComponent implements OnInit, AfterViewInit {

  ELEMENT_DATA: Address[] = [];
  displayedColumns: string[] = ['id', 'street', 'houseNumber', 'neigborhood','zipCode', 'country'];
  customer: Customer;
  customerId:number;
  dataSource = new MatTableDataSource<Address>(this.ELEMENT_DATA);
  userIsAdmin: boolean;

  
  constructor(
    private service: CustomerService,
    private route: ActivatedRoute,
    private authService: AuthService
    
  ) { }



  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.userIsAdmin = this.authService.getRole();
    this.customerId = this.route.snapshot.params['id'];
    this.findById(); // Aguarda os dados serem buscados
  }
  
  findById(): void { 
    this.service.findById(this.customerId).subscribe(resposta => {
      this.customer = resposta;
  
      // Atualiza a fonte de dados após os dados serem buscados
      this.ELEMENT_DATA = this.customer.address;
      this.dataSource.data = this.ELEMENT_DATA;
  
      console.log(this.ELEMENT_DATA);
    });
  }
}
