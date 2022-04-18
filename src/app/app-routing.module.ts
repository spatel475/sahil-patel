import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SentimentComponent } from './pages/sentiment/sentiment.component';


const routes: Routes = [
	{ path: 'sentiment', component: SentimentComponent },
	{ path: '**', redirectTo: '/sentiment' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
