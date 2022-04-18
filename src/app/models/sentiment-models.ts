export interface ApiResponseModel {
	time: string;
	text: string;
	model: string;
	sentiment: string | number;
}

export interface SelectionModel {
	value: string;
	viewValue: string;
}

export interface ModelInformation {
	id: string;
	name: string;
	params: string;
	fitTime: number;
	train_accuracy: number;
	test_accuracy: number;
	results: ClassificationResult[];
	imagePath: string;
	url: string;
}

export interface ClassificationResult {
	class: string;
	precision: number;
	recall: number;
	f1: number;
}
