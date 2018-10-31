<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Signup extends MX_Controller {
  function register()
  {
    $cektoken = $this->cekToken($this->input->request_headers());
    $userid = $cektoken['userid'];

    $this->load->helper('security');
    $this->load->model('mdl_carapp');
    $this->form_validation->set_rules('make_id', 'Make', 'trim|required|max_length[11]|xss_clean');
    $this->form_validation->set_rules('model_id', 'Model', 'trim|required|max_length[11]|xss_clean');
    $this->form_validation->set_rules('location_id', 'Location', 'trim|required|max_length[11]|xss_clean');
    $this->form_validation->set_rules('min_price', 'Minimum Price', 'trim|max_length[11]|xss_clean');
    $this->form_validation->set_rules('max_price', 'Maximum Price', 'trim|max_length[11]|xss_clean');

    if($this->form_validation->run($this) == FALSE)
    {
      $new=array();

      foreach( $this->form_validation->error_array() as $key=>$value) {
        $new['message'][]= $this->form_validation->error_array()[$key];
      }
        $this->output->set_output(json_encode(array('error'=>$new)), 400);http_response_code(400);

    } else {
      $this->load->model('mdl_carapp');
      $data = array(
        'user_id'       =>      $this->input->$userid,
        'make_id'       =>      $this->input->post('make'),
        'model_id'      =>      $this->input->post('model'),
        'location_id'   =>      $this->input->post('location'),
        'min_price'     =>      $this->input->post('min_price'),
        'max_price'     =>      $this->input->post('max_price'),
        'status'        =>      0
      );

      $id = $this->_insert($data);
      $this->output->set_output(json_encode(array('success'=>array('message'=>"Registration success, please check your email for verification."))), 200);
    } 
  }
?>