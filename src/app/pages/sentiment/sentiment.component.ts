import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponseModel, ModelInformation, SelectionModel } from 'src/app/models/sentiment-models';

@Component({
	selector: 'app-sentiment',
	templateUrl: './sentiment.component.html',
	styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent implements OnInit {
	testing = false;
	selectedTabIndex = 0;

	// tab 1 models
	selectedModel: string;
	models: SelectionModel[] = [
		{ value: 'lr', viewValue: 'Logistic Regression' },
		{ value: 'nb', viewValue: 'Naive Bayes' },
		{ value: 'svm', viewValue: 'Support Vector Machine' },
	];
	text = "";
	displayedColumns: string[] = ['time', 'text', 'model', 'sentiment'];
	results: ApiResponseModel[] = [];

	// tab 2 models
	modelResultsColumns: string[] = ['name', 'recall', 'precision', 'f1'];
	modelResults = ModelResults;

	constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

	ngOnInit(): void { }

	test() {
		this.testing = true;
		let url = `http://spatel475.pythonanywhere.com`;
		console.log('calling ' + url);

		this.http.get(url).subscribe({
			next: (e: any) => {
				alert(JSON.stringify(e))
				this.testing = false;
			},
			error: (e) => {
				this.testing = false;
				console.warn(e);
				this.snackbar.open("Something went wrong. Check console!", "OK", {
					duration: 10000,
					verticalPosition: 'top'
				})
			}
		});
	}

	getSentiment() {
		let url = `http://spatel475.pythonanywhere.com/sentiment?model=${this.selectedModel}&text=${this.text}`;
		console.log('calling ' + url);

		this.http.get(url).subscribe({
			next: (e: ApiResponseModel) => this.addToResults(e),
			error: (e) => {
				console.warn(e);
				this.snackbar.open("Something went wrong. Check console!", "OK", {
					duration: 10000,
					verticalPosition: 'top'
				})
			}
		});
	}

	private addToResults(e: ApiResponseModel): void {
		e.time = new Date().toLocaleTimeString();
		e.sentiment = e.sentiment == 0 ? 'Negative' : 'Positive';
		console.debug(e);
		this.results.unshift(e);
		this.results = [...this.results];
		this.text = "";
	}

	getParamsList(params: string): string[] {
		return params.split(',');
	}

	switchToPlayground(id: string) {
		this.selectedModel = id;
		this.selectedTabIndex = 1;
	}
}


const ModelResults: ModelInformation[] = [
	{
		id: 'lr',
		name: 'Logistic Regression',
		params: "solver='saga', n_jobs=-1",
		fitTime: 19,
		train_accuracy: 80.43,
		test_accuracy: 78.42,
		results: [
			{
				class: 'Negative',
				precision: 0.80,
				recall: 0.76,
				f1: 0.78
			},
			{
				class: 'Positive',
				precision: 0.77,
				recall: 0.80,
				f1: 0.79
			}
		],
		imagePath: './assets/images/sentiment/lr_confusion_matrix.png',
		url: 'https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html'
	},
	{
		id: 'nb',
		name: 'Bernoulli Naive Bayes',
		params: "alpha=.01, fit_prior=False",
		fitTime: 0,
		train_accuracy: 82.84,
		test_accuracy: 77.76,
		results: [
			{
				class: 'Negative',
				precision: 0.76,
				recall: 0.76,
				f1: 0.76
			},
			{
				class: 'Positive',
				precision: 0.76,
				recall: 0.76,
				f1: 0.76
			}
		],
		imagePath: 'assets/images/sentiment/nb_confusion_matrix.png',
		url: 'https://scikit-learn.org/stable/modules/generated/sklearn.naive_bayes.BernoulliNB.html'
	},
	{
		id: 'svm',
		name: 'Support Vector Machine',
		params: "default",
		fitTime: 19,
		train_accuracy: 81.05,
		test_accuracy: 76.07,
		results: [
			{
				class: 'Negative',
				precision: 0.79,
				recall: 0.76,
				f1: 0.77
			},
			{
				class: 'Positive',
				precision: 0.77,
				recall: 0.80,
				f1: 0.78
			}
		],
		imagePath: 'assets/images/sentiment/svm_confusion_matrix.png',
		url: 'https://scikit-learn.org/stable/modules/generated/sklearn.svm.LinearSVC.html'
	}
];

