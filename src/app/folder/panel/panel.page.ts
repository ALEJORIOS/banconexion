import { Component, OnInit } from '@angular/core';
import { format } from '@formkit/tempo';
import { CrudService } from 'src/app/services/crud.service';

@Component({
	selector: 'app-panel',
	templateUrl: './panel.page.html',
	styleUrls: ['./panel.page.scss'],
	standalone: false,
})
export class PanelPage implements OnInit {
	constructor(private crudService: CrudService) {}

	loadingState: boolean = false;

	loadingSummary: boolean = false;

	date: string = format(new Date(), { date: 'long' });

	threshold: number = 0;

	data: Summary = {
		adults: 0,
		count: 0,
		current: 0,
		kids: 0,
		men: 0,
		total: 0,
		und: 0,
		women: 0,
		youth: 0,
		area: {
			pro: null,
			alb: null,
			cre: null,
			con: null,
			dia: null,
			int: null,
			mat: null,
			jcr: null,
			ast: null,
			gdp: null,
		},
	};

	ngOnInit() {
		this.loadingSummary = true;
		this.crudService.getSummary(0).subscribe({
			next: (res) => {
				this.loadingSummary = false;
				this.data = res;
			},
			error: (err) => {
				console.error(err);
			},
		});
	}

	exportReport() {
		this.loadingState = true;
		this.crudService.exportReport().subscribe({
			next: (res) => {
				this.downloadFile(res, `Listado${format(new Date(), '-DD-MMMM-YYYY', 'es')}.xlsx`);
				this.loadingState = false;
			},
			error: (err) => {
				this.loadingState = false;
			},
		});
	}

	exportTransactions() {
		this.loadingState = true;
		this.crudService.exportTransactions().subscribe({
			next: (res) => {
				this.downloadFile(res, `Transacciones${format(new Date(), '-DD-MMMM-YYYY', 'es')}.xlsx'`);
				this.loadingState = false;
			},
			error: (err) => {
				this.loadingState = false;
			},
		});
	}

	downloadFile(data: any, fileName: string) {
		const type = data.body?.type;
		const file = new File([data.body!], fileName, { type });
		const fileReader = new FileReader();
		fileReader.addEventListener('load', () => {
			const aElement = document.createElement('a');
			aElement.href = fileReader.result as string;
			aElement.download = fileName || 'File';
			aElement.target = '_blank';
			aElement.click();
		});
		fileReader.readAsDataURL(file);
	}

	onRangeChange(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		this.threshold = parseInt(value, 10);
		this.loadingSummary = true;
		this.crudService.getSummary(this.threshold / 100).subscribe({
			next: (res) => {
				this.loadingSummary = false;
				this.data = res;
			},
		});
	}
}

export interface Summary {
	adults: number;
	count: number;
	current: number;
	kids: number;
	men: number;
	total: number;
	und: number;
	women: number;
	youth: number;
	area: Areas;
}

interface Areas {
	pro: number | null;
	alb: number | null;
	cre: number | null;
	con: number | null;
	dia: number | null;
	int: number | null;
	mat: number | null;
	jcr: number | null;
	ast: number | null;
	gdp: number | null;
}
