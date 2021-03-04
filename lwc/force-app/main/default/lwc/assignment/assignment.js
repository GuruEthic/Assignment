import { LightningElement,track,wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import PROJECT_OBJECT from '@salesforce/schema/Project1__c';
import STATUSS_FIELD from '@salesforce/schema/Project1__c.Status__c';
import PROJECTTYPE from '@salesforce/schema/Project1__c.ProjectType__c';
import PRIORITYY_FIELD from '@salesforce/schema/Project1__c.Priorityy__c';
import saveObj from '@salesforce/apex/assign.assign';

export default class assign extends LightningElement {
  desc = "";
  name = "";
  owner ='';
    @track statusValues;
    @track projectTypeValues;
    @track priorityTypeValues;

  //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded
  @track isModalOpen = false;
  openModal() {
    // to open modal set isModalOpen tarck value as true
    this.isModalOpen = true;
  }
  closeModal() {
    // to close modal set isModalOpen tarck value as false
    this.isModalOpen = false;
  }
  submitDetails() {
    this.isModalOpen = false;
  }

  @wire(getPicklistValues, {
    recordTypeId: '012000000000000AAA',
    fieldApiName: STATUSS_FIELD
   }) status;

@wire(getPicklistValues, {
    recordTypeId: '012000000000000AAA', 
   fieldApiName: PRIORITYY_FIELD
}) priority;

@wire(getPicklistValues, {
   recordTypeId: '012000000000000AAA', 
  fieldApiName: PROJECTTYPE
}) project;

  formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "indent",
    "align",
    "link",
    "image",
    "clean",
    "table",
    "header",
    "emoji"
  ];
  myval(event) {
    this.desc = event.target.value;
  }
  nameProject(event) {
    this.name = event.target.value;
  }
  handleChange(event) {
    this.valueStatus = event.detail.value;
  }
  ownerName(event){
    this.owner=event.target.value;
}

    handleChangeStatus(event){
        this.statusValues =event.target.value;
  }
    handlechangeProject(event){
        this.projectTypeValues=event.target.value;
  }
    handlechangePriority(event){
        this.priorityTypeValues=event.target.value;
  }

    saveRecord(){
      let projectObj = {'sobjectType':'Project1__c'};
      projectObj.Name=this.template.querySelector('lightning-input[name="projname"]').value;
      projectObj.Owners__c=this.template.querySelector('lightning-input[name="owners"]').value;
      projectObj.EndDate__c=this.template.querySelector('lightning-input[name="endDate"]').value;
      projectObj.Status__c=this.template.querySelector('lightning-combobox[name="statuss"]').value;
      projectObj.Priorityy__c=this.template.querySelector('lightning-input[name="priorityy"]').value;
      projectObj.ProjectType__c=this.template.querySelector('lightning-input[name="projectType"]').value;
      projectObj.Description__c=this.template.querySelector('lightning-input-rich-text').value;
     

    saveObj({newRecord: projectObj})
        .then(result => {
            this.recordId = result;
        })
        .catch(error => {
            this.error = error;
        });
        this.submitDetails();
    }

}