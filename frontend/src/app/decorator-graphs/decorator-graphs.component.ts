import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { BarController, PieController, BarElement, CategoryScale, Chart, ChartData, ChartType, Legend, LinearScale, Title, Tooltip, ArcElement } from 'chart.js';
import { Job } from '../models/job';
import { JobService } from '../services/job.service';
import { CompanyService } from '../services/company.service';
import { Company } from '../models/company';

Chart.register(BarController, PieController, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement);

@Component({
  selector: 'app-decorator-graphs',
  templateUrl: './decorator-graphs.component.html',
  styleUrls: ['./decorator-graphs.component.css']
})
export class DecoratorGraphsComponent implements AfterViewInit {

  @ViewChild('barCanvas') private barCanvas!: ElementRef;
  @ViewChild('histogramCanvas') private histogramCanvas!: ElementRef;
  @ViewChild('pieCanvas') private pieCanvas!: ElementRef;

  constructor(private jobService: JobService, private companyService: CompanyService) { }

  currentDecorator: string = "";

  jan: number = 0;
  feb: number = 0;
  mar: number = 0;
  apr: number = 0;
  maj: number = 0;
  jun: number = 0;
  jul: number = 0;
  avg: number = 0;
  sep: number = 0;
  okt: number = 0;
  nov: number = 0;
  dec: number = 0;

  pon: number = 0;
  uto: number = 0;
  sre: number = 0;
  cet: number = 0;
  pet: number = 0;
  sub: number = 0;
  ned: number = 0;
  ukupno_24meseca: number = 0;
  datum_danas: Date = new Date();

  ime_firme: string = "";
  broj_po_zaposlenom: number[] = [];
  firma: Company = new Company();

  tipPie: ChartType = 'pie';
  tipHistrograma: ChartType = 'bar';
  tipDijagrama: ChartType = 'bar';

  imenaKolona: string[] = ["JAN", "FEB", "MAR", "APR", "MAJ", "JUN", "JUL", "AVG", "SEP", "OKT", "NOV", "DEC"];
  imenaHistrogram: string[] = ["PONEDELJAK", "UTORAK", "SREDA", "ČETVRTAK", "PETAK", "SUBOTA", "NEDELJA"];
  imenaPie: string[] = [];

  podaciKolonaDijagrma: ChartData<'bar'> = {
    labels: this.imenaKolona,
    datasets: [
      {
        data: [],
        label: "Broj poslova po mesecu",
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };

  podaciHistograma: ChartData<'bar'> = {
    labels: this.imenaHistrogram,
    datasets: [
      {
        data: [],
        label: "Prosečan broj poslova po danu u nedelji",
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };

  podaciPie: ChartData<'pie'> = {
    labels: this.imenaPie,
    datasets: [
      {
        data: [],
        backgroundColor: []
      }
    ]
  };

  allMyJobs: Job[] = [];

  ngAfterViewInit(): void {
    const dekorater = localStorage.getItem("ulogovan");
    if (dekorater) {
      this.currentDecorator = dekorater;
    } else {
      alert("Prazno!");
    }
    this.getAllMyJobsByMonth();
    //this.getCompanyByName();
  }

  kolonaDijagram() {
    new Chart(this.barCanvas.nativeElement, {
      type: this.tipDijagrama,
      data: this.podaciKolonaDijagrma,
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
    });
  }

  pie() {
    //console.log('Podaci za pie grafikon:', this.broj_po_zaposlenom);
    //console.log('Imena za pie grafikon:', this.imenaPie);

    new Chart(this.pieCanvas.nativeElement, {
      type: this.tipPie,
      data: {
        labels: this.imenaPie,
        datasets: [{
          data: this.broj_po_zaposlenom,
          backgroundColor: this.generateBackgroundColors(this.imenaPie.length)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
    });
  }

/*
  pie() {
    new Chart(this.pieCanvas.nativeElement, {
      type: this.tipPie,
      data: this.podaciPie,
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
    });
  }
*/

  histrogram() {
    new Chart(this.histogramCanvas.nativeElement, {
      type: this.tipHistrograma,
      data: this.podaciHistograma,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: false
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: true
            }
          }
        },
        plugins: {
          legend: {
            display: true
          }
        }
      },
    });
  }

  getAllMyJobsByMonth() {
    this.jobService.getAllMyJobsAsDecorator(this.currentDecorator).subscribe(data => {
      this.allMyJobs = data;
      this.ime_firme = this.allMyJobs[0]?.firma || '';
      //alert(this.ime_firme);
      this.processJobsDataMonth();
      this.processJobDataDay();
      this.updateHistogramData();
      this.updateChartData();
      this.kolonaDijagram();
      this.histrogram();
      this.getCompanyByName();
    }, error => {
      console.error('Greška pri dobijanju podataka:', error);
    });
  }

  processJobsDataMonth() {
    for (const job of this.allMyJobs) {
      const month = job.datum_kraja_radova.substring(3, 5);
      switch (month) {
        case "01": this.jan++; break;
        case "02": this.feb++; break;
        case "03": this.mar++; break;
        case "04": this.apr++; break;
        case "05": this.maj++; break;
        case "06": this.jun++; break;
        case "07": this.jul++; break;
        case "08": this.avg++; break;
        case "09": this.sep++; break;
        case "10": this.okt++; break;
        case "11": this.nov++; break;
        case "12": this.dec++; break;
      }
    }
  }

  updateChartData() {
    this.podaciKolonaDijagrma.datasets[0].data = [
      this.jan, this.feb, this.mar, this.apr, this.maj, this.jun,
      this.jul, this.avg, this.sep, this.okt, this.nov, this.dec
    ];
  }

  processJobDataDay() {
    const godina = this.datum_danas.getFullYear();
    for (const job of this.allMyJobs) {
      const [day, month, year] = job.datum_kraja_radova.split('.').map(Number);
      const date = new Date(year, month - 1, day);
      if (godina - year <= 2) {
        switch (date.getDay()) {
          case 0: this.pon++; break;
          case 1: this.uto++; break;
          case 2: this.sre++; break;
          case 3: this.cet++; break;
          case 4: this.pet++; break;
          case 5: this.sub++; break;
          case 6: this.ned++; break;
        }
        this.ukupno_24meseca++;
      }
    }
  }

  updateHistogramData() {
    this.podaciHistograma.datasets[0].data = [
      this.pon / this.ukupno_24meseca,
      this.uto / this.ukupno_24meseca,
      this.sre / this.ukupno_24meseca,
      this.cet / this.ukupno_24meseca,
      this.pet / this.ukupno_24meseca,
      this.sub / this.ukupno_24meseca,
      this.ned / this.ukupno_24meseca
    ];
  }

  getCompanyByName() {
    this.companyService.getCompanyByName(this.ime_firme).subscribe(
      data => {
        if(data == null)alert("Nije pronadjena firma!")
        this.firma = data;
        this.imenaPie = this.firma.lista_zaposlenih;
        for (let i = 0; i < this.imenaPie.length; i++) {
          this.jobService.getAllMyJobsAsDecorator(this.imenaPie[i]).subscribe(
            jobsData => {
              this.broj_po_zaposlenom[i] = jobsData.length;
              if(i == this.imenaPie.length - 1){
                this.updatePieData();
                this.pie();
              }
            }
          );
        }
        //this.updatePieData();
        //this.pie();
      }
    );
  }

  updatePieData() {
    this.podaciPie.datasets[0].data = this.broj_po_zaposlenom;
    this.podaciPie.datasets[0].backgroundColor = this.generateBackgroundColors(this.imenaPie.length);
  }

  generateBackgroundColors(length: number): string[] {
    const colors = [];
    for (let i = 0; i < length; i++) {
      colors.push(`hsl(${(i * 360) / length}, 70%, 50%)`);
    }
    return colors;
  }
}
