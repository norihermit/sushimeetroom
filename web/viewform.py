# forms.py
from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField
from wtforms.fields.html5 import DateField, TimeField
from wtforms.validators import DataRequired

class ReservationForm(FlaskForm):
    c_id = StringField('ID', validators=[DataRequired()])
    meetroom = SelectField('會議室', choices=[('A001', 'A001'), ('A002', 'A002'), ..., ('A025', 'A025')], validators=[DataRequired()])
    start_date = DateField('預約開始日期', validators=[DataRequired()])
    start_time = TimeField('預約開始時間', validators=[DataRequired()])
    end_date = DateField('預約結束日期', validators=[DataRequired()])
    end_time = TimeField('預約結束時間', validators=[DataRequired()])
    submit = SubmitField('確認')
