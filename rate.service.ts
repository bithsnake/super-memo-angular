import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, ReplaySubject } from 'rxjs';
import { UserService } from '../user-app/services/user.service';
import { ErrorCode, ErrorException, TypeOfJob } from './shared/error-model';
import { Ratings } from './shared/rating-model';
import { Reviews } from './shared/review-model';

const apiURL = "https://funcapp-rate.azurewebsites.net/api";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  body: {},
  Authorization : ""
};

//#region HOT TO SUBSCRIBE TO EMITTERS IN COMPONENTS
/*

Emitters that you can subscribe to:
-----------------------------------
ratingCreated
ratingChanged
reviewCreated
reviewChanged
-----------------------------------


Emitter subscriptions can be set dirfectly in the constructor body as shown below, this way
you can react to an event where a review or rating has been created.
################################################################################################################


constructor(private rate: RateService, private view: ViewServiceService,private userService : UserService) {
  this.placeId = "1";

  this.rate.reviewChanged.subscribe(reviewData => {
    alert("reviews changed!");
    console.log("reviews changed!", reviewData);
    this.GetReviews();
  });

  this.rate.reviewCreated.subscribe(reviewData => {
    alert("review created!");
    console.log("review created!", reviewData);
    this.GetReviews();
  });
}
################################################################################################################

*/
//#endregion

/**
  ERROR TEST URL QUERY PARAMETERS
  -------------------------------
  badrequest=true
  internalservererror=true
  unprocessableentity=true
  -------------------------------
 */
@Injectable({
  providedIn: 'root'
})
/**A Service for ratings containing methods to get data from azure db */
export class RateService {

  /**An emitter that lets you subscribe to ratings created that gets an ERROR*/
  public ratingCreateError = new EventEmitter<ErrorException>();
  /**An emitter that lets you subscribe to ratings changed that gets an ERROR*/
  public ratingChangedError = new EventEmitter<ErrorException>();
  /**An emitter that lets you subscribe to rating edit/updates that gets an ERROR*/
  public ratingUpdateError = new EventEmitter<ErrorException>();
  /**An emitter that lets you subscribe to rating delete that gets an ERROR*/
  public ratingDeleteError = new EventEmitter<ErrorException>();
  /**An emitter that lets you subscribe to ratings that has been CREATED*/
  public ratingCreated = new EventEmitter<Ratings>();
  /**An emitter that lets you subscribe to ratings that has been CHANGED/UPDATED*/
  public ratingChanged = new EventEmitter<Ratings>();

  /**An emitter that lets you subscribe to review created that gets an ERROR*/
  public reviewCreateError = new EventEmitter<ErrorException>();
  /**An emitter that lets you subscribe to reviews changed that gets an ERROR*/
  public reviewChangedError = new EventEmitter<ErrorException>();
  /**An emitter that lets you subscribe to review edit/updates that gets an ERROR*/
  public reviewUpdateError = new EventEmitter<ErrorException>();
  /**An emitter that lets you subscribe to review edelete that gets an ERROR*/
  public reviewDeleteError = new EventEmitter<ErrorException>();
  /**An emitter that lets you subscribe to reviews that has been CREATED*/
  public reviewCreated = new EventEmitter<Reviews>();
  /**An emitter that lets you subscribe to reviews that has been CHANGED/UPDATED*/
  public reviewChanged = new EventEmitter<Reviews>();
  /**An emitter that lets you subscribe to reviews that has been DELETED*/
  public reviewDeleted = new EventEmitter<Reviews>();

  /** A collection of error messages to show the end-user */
  public ErrorMessages = {
    InternalError: `Oops❗ Seems like we can not send this request right now, please try again later or contact support at 📧 ${'<a href="support__@contoso.com" Volvo Support</a>'}`,
    NotFound : `Oops❗ Seems like we can not send this request right now, please try again later or contact support at 📧 ${'<a href="support__@contoso.com" Volvo Support</a>'}`,
    DuplicateData: `You have already rated this once, to avoid cheating, ratings can only be made once per booking ☝️`,
    BadRequest :  `Oops❗ Seems like we can not send this request right now, please try again later or contact support at 📧 ${'<a href="support__@contoso.com" Volvo Support</a>'}`
  }
  constructor(private http: HttpClient, private userServices: UserService) { }

  //#region RATINGS
  /**An async method that returns a resolved Promise object containing an array of rating objects */
  public async getRatings(placeId: number | string) {
    this.GetToken();
    try {
      return new Promise<Ratings[] | any>((resolve, reject) => {
        const response = this.http.get(`${apiURL}/ratings?placeId=${this.GetPlaceId(placeId)}`).subscribe(res => {
          const ratings = res;
          resolve(ratings);
        });
      }).catch(error => {
        console.log("rejected :" , error);
      })
    } catch (error) {
      this.ThrowError(error as HttpErrorResponse, TypeOfJob.GetRatings);
      throw new Error("Error: " + error);
    }
  };
  /**Sends a POST request with a Ratings Object to the Backend */
  public postRating(newRating: Ratings): any {
    this.GetToken();
    const request = this.http.post<Ratings>(`${apiURL}/ratings`, newRating, httpOptions);
    request.pipe(
      catchError((err) => {
        this.ThrowError(err as HttpErrorResponse, TypeOfJob.CreateRating);
        throw console.log("err: ", err);
      }
      )
    ).subscribe(res => {
      this.ratingCreated.emit();
      console.log("Status supposedly OK: ", res);
    });
  };
  public updateRating(updatedRating: Ratings) {
    this.GetToken();
    const request = this.http.put<Ratings>(`${apiURL}/ratings/${updatedRating.ratingId}&unprocessableentity=true`, updatedRating, httpOptions);
    request.pipe(
      catchError((err) => {
        this.ThrowError(err as HttpErrorResponse, TypeOfJob.UpdateRating);
        throw console.log("err: ", err);
      }
      )
    ).subscribe(res => {
      this.ratingChanged.emit(res);
      console.log(`Update Rating with id ${updatedRating.ratingId}: Status supposedly OK, `, res);
    });
  };
  public deleteRating(deletedRating: Ratings) {
    this.GetToken();
    httpOptions.body = deletedRating;
    const request = this.http.delete<Ratings>(`${apiURL}/ratings/`, httpOptions.body);
    request.pipe(
      catchError((err) => {
        this.ThrowError(err as HttpErrorResponse, TypeOfJob.DeleteRating);
        throw console.log("err: ", err);
      }
      )
    ).subscribe(res => {
      this.ratingChanged.emit(res);
      console.log(`Delete Rating with id ${deletedRating.ratingId}: Status supposedly OK, `, res);
    });
  };
  //#endregion

  //#region REVIEWS
  /**An async method that returns a resolved Promise object containing an array of review objects */
  public async getReviews(placeId: number | string) {
    this.GetToken();
    try {
      return new Promise<Reviews[] | any>((resolve) => {

        this.http.get(`${apiURL}/reviews?placeId=${this.GetPlaceId(placeId)}`).subscribe(res => {
          if (res === null || res === undefined) throw new Error("Something went wrong getting data: " + res);
          const _reviews: Reviews[] = res as Reviews[];
          _reviews.reverse();
          resolve(_reviews);
        })
      })
    } catch (error) {
      this.ThrowError(error as HttpErrorResponse, TypeOfJob.GetReviews);
      throw new Error("Error: " + error);
    }
  };
  /**Sends a POST request with a Review Object to the Backend */
  public postReview(newReview: Reviews): void {
    this.GetToken();
    const request = this.http.post<Reviews>(`${apiURL}/reviews`, newReview, httpOptions);
    request.pipe(
      catchError((err) => {
        this.ThrowError(err as HttpErrorResponse, TypeOfJob.CreateReview);
        throw console.log("err: ", err);
      }
      )
    ).subscribe(res => {
      if ((res.reviewText as string) === '') return;
      this.reviewCreated.emit();
      console.log(`Post Review with the following content ${newReview.reviewText}: Status supposedly OK, `, res);
    });
  };
  /**A method that updates */
  public async updateReview(updatedReview: Reviews) {
    this.GetToken();
    const request = this.http.put<Reviews>(`${apiURL}/reviews/${updatedReview.reviewId}`, updatedReview, httpOptions);
    request.pipe(
      catchError((err) => {
        this.ThrowError(err as HttpErrorResponse, TypeOfJob.UpdateReview);
        throw console.log("err: ", err);
      }
      )
    ).subscribe(res => {
      this.reviewChanged.emit(res);
      console.log(`Update Review with id ${updatedReview.reviewId}: Status supposedly OK, `, res);
    });
  };
  /**An method that deletetes an review depending on the reviewId. */
  public async deleteReview(deletedReview: Reviews) {
    this.GetToken();
    const request = this.http.delete<Reviews>(`${apiURL}/reviews/${deletedReview.reviewId}`);
    request.pipe(
      catchError((err) => {
        this.ThrowError(err as HttpErrorResponse, TypeOfJob.DeleteReview);
        throw console.log("err: ", err);
      }
      )
    ).subscribe(res => {
      this.reviewDeleted.emit(res);
      console.log(`Deleted Review with id ${deletedReview.reviewId}: Status supposedly OK, `, res);
    });
  };
  //#endregion

  //#region  MISC
  /**Returns the placeId given from an click event on a place, and returns a random placeId between 1 & 2 if the given place id is -1, 'undefined', undefined or null */
  public GetPlaceId(placeId: number | string | null) {
    const n = String(this.Choose(1, 2)); //TEST randomises between these place id's to give data from BE
    return placeId === -1 ||placeId === undefined || placeId === null || placeId === 'undefined' ? n : placeId
  };
  public GetToken() {
    let token = this.userServices.gettoken()
    token === undefined ? "" : token;
    httpOptions.Authorization = `Bearer ${token}`;
  }
  /**Checks if value is null or undefined and throws an error this is the case*/
  public CheckError(value : any) : void {
    if (value === null || value === undefined) throw new Error(`${value} is null or undefined: " +"\n" + ${value}`);
  };
  /**Randomizes a number between the array of numbers given in the parameter, comma separated EX: Choose(1,4,2,5,6,7) */
  public Choose(...args : Number[]) : Number  {
    const n = Math.floor(Math.random() * 1 * args.length);
    return args[n];
  };
  private ThrowError(errorObject: HttpErrorResponse, jobType : TypeOfJob) {
    switch (jobType) {
      case TypeOfJob.GetRatings:
        this.SendErrorMessage(errorObject, this.ratingChangedError,jobType)
        break;
        case TypeOfJob.CreateRating:
        this.SendErrorMessage(errorObject,this.ratingCreateError,jobType)
        break;
        case TypeOfJob.UpdateRating:
        this.SendErrorMessage(errorObject,this.ratingUpdateError,jobType)
        break;
        case TypeOfJob.DeleteRating:
        this.SendErrorMessage(errorObject,this.ratingDeleteError,jobType)
        break;
        case TypeOfJob.GetReviews:
        this.SendErrorMessage(errorObject,this.reviewChangedError,jobType)
        break;
        case TypeOfJob.CreateReview:
        this.SendErrorMessage(errorObject,this.reviewCreateError,jobType)
        break;
        case TypeOfJob.UpdateReview:
        this.SendErrorMessage(errorObject,this.reviewUpdateError,jobType)
        break;
        case TypeOfJob.DeleteReview:
        this.SendErrorMessage(errorObject,this.reviewDeleteError,jobType)
      break;
    }

  };
  private SendErrorMessage(errorObject: HttpErrorResponse, emitter: EventEmitter<any>, typeOfJob : TypeOfJob) {
    const error = new ErrorException(errorObject.message, errorObject.error);
    switch (errorObject.status) {
      case ErrorCode.InternalServerError /*code: 500 */:
        error.message = this.ErrorMessages.InternalError;
        emitter.emit(error);
        throw console.log("err 500: ", errorObject,typeOfJob);
      case ErrorCode.BadRequest /*code : 400  */:
        error.message = this.ErrorMessages.BadRequest;
        emitter.emit(new ErrorException(error.message, errorObject.error))
        throw console.log("err 400: ", errorObject);
      case ErrorCode.DuplicateData /* code : 422 */:
        error.message = this.ErrorMessages.DuplicateData;
        emitter.emit(new ErrorException(error.message, errorObject.error))
        throw console.log("err 422: ", errorObject);
      case ErrorCode.NotFound /* code : 404 */:
        error.message = this.ErrorMessages.NotFound;
        emitter.emit(new ErrorException(error.message, errorObject.error))
        throw console.log("err 422: ", errorObject);
    }
  }
  //#endregion
}
