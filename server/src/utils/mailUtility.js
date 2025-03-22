class MailTemplate {
    constructor(db,template,payload){
        this._db = db;
        this._template = template;
        this._payload = payload;
        this.MailTemplate()
    }
async MailTemplate(){
    let name=this.getTemplate(this._template);
    let template = (name !== null && name !== undefined) ? name : "";
    await this._db.sequelize.query(`INSERT INTO email_queues (action_name,payload,send_date,createdon) VALUES (:_action_name, :_payload, now(), now())`,
    {
        replacements: {
        _action_name:template,
        _payload:JSON.stringify(this._payload)
        }
    });
  }
  getTemplate(field) {    
    var obj = {
        'otp_email': "otp_email",
        'otp_email_forgot': "otp_email_forgot",
        'user_welcome_email': "user_welcome_email",
        'new_password_updated': "new_password_updated",
        'customer_otp_email': "customer_otp_email",
        'customer_welcome_email': "customer_welcome_email",
        'customer_otp_email_forgot': "customer_otp_email_forgot",
        'customer_new_password_updated': "customer_new_password_updated",
        'contact_inquiry': "contact_inquiry",
        'new_alog_added':'new_alog_added',
        'package_subscription_purchase_by_customer	':'package_subscription_purchase_by_customer	',
    };
    return obj[field];
  }
}
module.exports=MailTemplate