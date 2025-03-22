class NotiTemplate {
    constructor(db,template,payload,type, type_id){
        this._db = db;
        this._template = template;
        this._payload = payload;
        this._type = type;
        this._type_id = type_id;
        this.NotiTemplate()
    }
async NotiTemplate(){
    let name=this.getTemplate(this._template);
    let template = (name !== null && name !== undefined) ? name : "";
    await this._db.sequelize.query(`INSERT INTO noti_logs (template_action,payload,type,type_id, createdon) VALUES (:_action_name, :_payload, :_type, :_type_id, now())`,
    {
        replacements: {
        _action_name:template,
        _payload:JSON.stringify(this._payload),
        _type: this._type,
        _type_id: this._type_id
        }
    });
  }
  getTemplate(field) {    
    var obj = {
        'welcome_contact': "welcome_contact",
        'contact_inquiry': "contact_inquiry",
        'new_alog_added':'new_alog_added',
    };
    return obj[field];
  }
}
module.exports=NotiTemplate