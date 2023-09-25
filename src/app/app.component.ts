import { Component, OnInit } from '@angular/core';
import { TriviaService } from './trivia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  // properties
  title = 'Trivia Game';
  question: any;
  selectedAnswer: string | null = null;
  correctAnswer: string | null = null;
  streak: number = 0;
  difficulty: string = 'easy';
  answers: string[] = [];

  // messages
  goodMessage: string = 'Good Job!';
  wrongMessage: string = 'Wrong! Please try again';
  errorMessage: string = 'Please select an answer';
  showGoodMessage: boolean = false;
  showWrongMessage: boolean = false;
  showErrorMessage: boolean = false;
  showSubmit: boolean = true;

  constructor(private triviaService: TriviaService, private router: Router) {}

  // initialize component
  ngOnInit(): void {
    this.newQuestion();
  }

  // get a new question
  newQuestion(): void {
    this.triviaService.getQuestion(1, this.difficulty, 'multiple', 9).subscribe((data) => {
      this.question = data.results[0];
      this.answers = [this.question.correct_answer, ...this.question.incorrect_answers];
      this.shuffleAnswers();
    });
  }

  // check the selected answer
  checkAnswer(answer: string | null): void {
    if (answer === this.question.correct_answer) {
      this.correctAnswer = answer;
      this.showSubmit = false;
      this.showGoodMessage = true;
      this.showErrorMessage = false;
      this.showWrongMessage = false;
      this.streak += 1;
    } else if (answer == null) {
      this.showErrorMessage = true;
    } else {
      this.showSubmit = false;
      this.showWrongMessage = true;
      this.showErrorMessage = false;
      this.streak = 0;
      this.difficulty = 'easy';
      this.correctAnswer = this.question.correct_answer;
    }
  }

  // shuffle answer options
  shuffleAnswers(): void {
    for (let i = this.answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.answers[i], this.answers[j]] = [this.answers[j], this.answers[i]];
    }
  }

  // move to the next question
  nextQuestion(): void {
    this.showSubmit = true;
    this.showGoodMessage = false;
    this.showWrongMessage = false;
    this.showErrorMessage = false;
    this.selectedAnswer = null;
    this.correctAnswer = null;
    this.newQuestion();
    this.game();
  }

  // set game difficulty based on streak
  game(): void {
    if (this.streak === 10) {
      this.router.navigate(['/congratulations']);
    } else if (this.streak >= 4 && this.streak <= 6) {
      this.difficulty = 'medium';
    } else if (this.streak >= 7) {
      this.difficulty = 'hard';
    }
  }
}
