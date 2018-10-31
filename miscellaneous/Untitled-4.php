<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Carapp extends MX_Controller {

    function __construct() {
        parent::__construct();
    }

    function index() {
    }

    function cekToken($token){
      if(array_key_exists('Authorization',$token))
           {
               if($token['Authorization'] && substr($token['Authorization'],0,5) != "Basic")
               {
                   $decode_token = $this->decode_token($token['Authorization']);
             if($decode_token->exp > time())
                 {
            return array('userid'=>$decode_token->data->userid,'username'=>$decode_token->data->username);
                 }else{
                       echo json_encode(array('error'=>array('message'=>"Sorry, your session has expired please login again.")));http_response_code(401);exit;
                   }
               }
       }
    }

    function makes()
    {
        $cektoken = $this->cekToken($this->input->request_headers());
        $this->load->model('Mdl_carapp');
        if($cektoken)
        {
          $token = $this->generate_token($cektoken['userid'],$cektoken['username']);
        }else{
          $token = '';
        }

        $data = array(
          'token' => $token,
          'data'  => $this->Mdl_carapp->get_makes()
        );
        $this->output->set_output(json_encode($data), 200);
    }

    function models()
    {
        $cektoken = $this->cekToken($this->input->request_headers());
        $this->load->model('Mdl_carapp');
        if($cektoken)
        {
          $token = $this->generate_token($cektoken['userid'],$cektoken['username']);
        }else{
          $token = '';
        }

        $data = array(
          'token' => $token,
          'data'  => $this->Mdl_carapp->get_models()
        );
        $this->output->set_output(json_encode($data), 200);
    }

    function locations()
    {
        $cektoken = $this->cekToken($this->input->request_headers());
        $this->load->model('Mdl_carapp');
        if($cektoken)
        {
          $token = $this->generate_token($cektoken['userid'],$cektoken['username']);
        }else{
          $token = '';
        }

        $data = array(
          'token' => $token,
          'data'  => $this->Mdl_carapp->get_locations()
        );
        $this->output->set_output(json_encode($data), 200);
    }

    function prizedetail($contest_id) {
        $cektoken = $this->cekToken($this->input->request_headers());
        $array = array();
        if($cektoken) {
            $user_id = $cektoken['userid'];
            $user_entry_count = 0;

            $this->load->model('Mdl_draft');
            $data1 = $this->Mdl_draft->get_user_entry_count($contest_id, $user_id);
                foreach ($data1->result() as $row) {
                    $user_entry_count = $row->user_entry_count;
                }
            $token = $this->generate_token($cektoken['userid'],$cektoken['username']);
        } else {
            $user_entry_count = '-';
            $token = '';
        }

        $this->load->model('Mdl_draft');
        $data = $this->Mdl_draft->get_prize_details($contest_id);
        $this->output->set_output(json_encode(array('token'=>$token,'data'=>$data)), 200);
    }

    function leagues()
    {
        $cektoken = $this->cekToken($this->input->request_headers());
        $this->load->model('Mdl_draft');
        if($cektoken)
        {
          $token = $this->generate_token($cektoken['userid'],$cektoken['username']);
        }else{
          $token = '';
        }

        $data = array(
          'token' => $token,
          'data'  => $this->Mdl_draft->get_league()
        );
        $this->output->set_output(json_encode($data), 200);
    }

    function players($contest_id,$position=null)
    {
        $cektoken = $this->cekToken($this->input->request_headers());
        if($cektoken)
        {
          $token = $this->generate_token($cektoken['userid'],$cektoken['username']);
        }else{
          $token = '';
        }
        $array_players = array();
        $this->load->model('mdl_draft');
        $data = $this->mdl_draft->get_all_players_one($contest_id,$position);
        foreach ($data->result() as $row){

            $array_players[] = array(
                'player_phase_id'   =>      $row->players_phases_id,
                'first_name'   =>      $row->first_name,
                'last_name'      =>      $row->last_name,
                'team_phase_id'       =>      $row->players_phases_teams_phases_id,
                'team_name'     =>      $row->team_name,
                'team_shorthand'        =>      $row->team_shorthand,
        'descrip'        =>      $row->descrip,
                'pos'      =>      $row->position,
                'role'     =>      $row->depth_chart,
                'oppid'     =>      $row->oppid,
                'opp_team_name' => $row->opp_team_name,
                'opp_team_shorthand' => $row->opp_team_shorthand,
                'fp_avg'    =>  $row->avg_fp,
                'fp_form'    =>  $row->form,
                'salary'    =>  $row->salary
            );
        };
        $result = array(
          'token' => $token,
          'data' => $array_players,
        );
        $this->output->set_output(json_encode($result), 200);
    }


    function goalkeepers($contest_id,$position=null)
    {
        $cektoken = $this->cekToken($this->input->request_headers());
        if($cektoken)
        {
          $token = $this->generate_token($cektoken['userid'],$cektoken['username']);
        }else{
          $token = '';
        }
        $array_players = array();
        $this->load->model('mdl_draft');
        $data = $this->mdl_draft->get_all_goalkeepers_one($contest_id,$position);
        foreach ($data->result() as $row){

            $array_players[] = array(
                'player_phase_id'   =>      $row->players_phases_id,
                'first_name'   =>      $row->first_name,
                'last_name'      =>      $row->last_name,
                'team_phase_id'       =>      $row->players_phases_teams_phases_id,
                'team_name'     =>      $row->team_name,
                'team_shorthand'        =>      $row->team_shorthand,
        'descrip'        =>      $row->descrip,
                'pos'      =>      $row->position,
                'role'     =>      $row->depth_chart,
                'oppid'     =>      $row->oppid,
                'opp_team_name' => $row->opp_team_name,
                'opp_team_shorthand' => $row->opp_team_shorthand,
                'fp_avg'    =>  $row->avg_fp,
                'fp_form'    =>  $row->form,
                'salary'    =>  $row->salary
            );
        };
        $result = array(
          'token' => $token,
          'data' => $array_players,
        );
        $this->output->set_output(json_encode($result), 200);
    }

    function playerstest($contest_id,$position=null)
    {
        $cektoken = $this->cekToken($this->input->request_headers());
        if($cektoken)
        {
          $token = $this->generate_token($cektoken['userid'],$cektoken['username']);
        }else{
          $token = '';
        }
        $array_players = array();
        $this->load->model('mdl_draft');
        $data = $this->mdl_draft->get_all_players_one_test($contest_id,$position);
        foreach ($data->result() as $row){

            $array_players[] = array(
                'player_phase_id'   =>      $row->players_phases_id,
                'first_name'   =>      $row->first_name,
                'last_name'      =>      $row->last_name,
                'team_phase_id'       =>      $row->players_phases_teams_phases_id,
                'team_name'     =>      $row->team_name,
                'team_shorthand'        =>      $row->team_shorthand,
        'descrip'        =>      $row->descrip,
                'pos'      =>      $row->position,
                'role'     =>      $row->depth_chart,
                'oppid'     =>      $row->oppid,
                'opp_team_name' => $row->opp_team_name,
                'opp_team_shorthand' => $row->opp_team_shorthand,
                'salary'    =>  $row->salary
            );
        };
        $result = array(
          'token' => $token,
          'data' => $array_players,
        );
        $this->output->set_output(json_encode($result), 200);
    }


    function playerdetail($contest_id,$player_id) {
        $cektoken = $this->cekToken($this->input->request_headers());
        if($cektoken)
        {
          $token = $this->generate_token($cektoken['userid'],$cektoken['username']);
        }else{
          $token = '';
        }

        $this->load->module('players_phaseslobby');
        $data['player_info'] = $this->players_phaseslobby->get_players_list_contest_individual($contest_id, $player_id);

        $this->load->module('players_phaseslobby');
        $data['player_stats_log'] = $this->players_phaseslobby->get_player_stats_individual_trial($contest_id, $player_id);

        $datas = array(
          'token' => $token,
          'data' => $data,
        );

        $this->output->set_output(json_encode($datas), 200);
    }

    function events($contest_id) {
        $cektoken = $this->cekToken($this->input->request_headers());
        $this->load->model('mdl_draft');
        if($cektoken)
        {
          $token = $this->generate_token($cektoken['userid'],$cektoken['username']);
        }else{
          $token = '';
        }
        $data = array(
          "token" => $token,
          "data" => $this->mdl_draft->get_events($contest_id),
        );
        $this->output->set_output(json_encode($data), 200);
    }

    function contests($league_id=null)
    {
        $cektoken = $this->cekToken($this->input->request_headers());
        $this->load->model('Mdl_draft');
        if($cektoken)
        {
          $token = $this->generate_token($cektoken['userid'],$cektoken['username']);
          $data = array(
            'token' => $token,
            'data'  => array(
                'active_contests' => $this->Mdl_draft->get_contest_status($league_id, TRUE,$cektoken['userid'])
            )
          );
        }else{
          $token = '';
          $data = array(
            'token' => $token,
            'data'  => array(
                'active_contests' => $this->Mdl_draft->get_contest_status($league_id, TRUE,null)
            )
          );
        }


        $this->output->set_output(json_encode($data), 200);
    }

    function contestdetails($league_id,$contest_id) {
        $cektoken = $this->cekToken($this->input->request_headers());
        $array = array();
        if($cektoken) {
            $user_id = $cektoken['userid'];
            $user_entry_count = 0;

            $this->load->model('Mdl_draft');
            $data1 = $this->Mdl_draft->get_user_entry_count($contest_id, $user_id);
                foreach ($data1->result() as $row) {
                    $user_entry_count = $row->user_entry_count;
                }
            $token = $this->generate_token($cektoken['userid'],$cektoken['username']);
        } else {
            $user_entry_count = '-';
            $token = '';
        }


        $this->load->model('Mdl_draft');
        $data = $this->Mdl_draft->get_contest_details($league_id, $contest_id);
        foreach ($data->result() as $row){
            $date = new DateTime($row->start_date.' '.$row->start_time);
            $array = array(
                'contest_id'            =>  $row->contests_id,
                'league_id'             =>  $row->leagues_id,
                'contest_name'          =>  $row->contest_name,
                'entry_max'             =>  $row->entry_max,
                'entry_fee'             =>  $row->entry_fee,
                'entry_max_register'    => $row->entry_limit_register,
                'sponsors_id'           =>  $row->sponsors_id,
                'sponsorname'           =>  $row->sponsor,
                'sponsorlogodesktop'           =>  base_url().'viewimage/logo/sponsor/desktop/'.$row->sponsors_id,
                'sponsorlogotablet'           =>  base_url().'viewimage/logo/sponsor/tablet/'.$row->sponsors_id,
                'sponsorlogomobile'           =>  base_url().'viewimage/logo/sponsor/mobile/'.$row->sponsors_id,
                'sponsorbannerdesktop'         =>  base_url().'viewimage/img/desktop/'.$row->sponsors_id,
                'sponsorbannertablet'         =>  base_url().'viewimage/img/tablet/'.$row->sponsors_id,
                'sponsorbannermobile'         =>  base_url().'viewimage/img/mobile/'.$row->sponsors_id,
                'league_name'           =>  $row->league_name,
                'league_shorthand'      =>  $row->league_shorthand,
                'start_date'            =>  $row->start_date,
                'start_time'            =>  $row->start_time,
                'start_timestamp'       =>      $date->getTimestamp(),
                'start_fulldate'        =>      date('D M j G:i:s T Y', $date->getTimestamp()),
                'entry_count'           =>  $row->entry_count,
                'user_entry_count'      =>  $user_entry_count,
                "prize" => $row->currency.' '.number_format($row->prize).$row->upto,
        "prizeint" => $row->prize
            );
        }
        $this->output->set_output(json_encode(array('token'=>$token,'data'=>$array)), 200);
    }

    function join($contest_id)
    {
        $cektoken = $this->cekToken($this->input->request_headers());

        if($cektoken) {
            $userid = $cektoken['userid'];
            $token = $this->generate_token($cektoken['userid'],$cektoken['username']);
        } else {
            $user_entry_count = '-';
            $token = '';
        }

        if(isset($userid))
        {
            $this->load->model('mdl_draft');
            $err = array();
            $cekContest = $this->mdl_draft->check_contest_start($contest_id);
            $cekCount = $this->mdl_draft->check_contest_count($contest_id,$userid);
            foreach ($cekCount->result() as $row) {
                $total_entry_count = $row->number_of_total_entry;
                $user_entry_count = $row->number_of_user_entry;
                $total_entry_max = $row->entry_max;
                $user_entry_max= $row->entry_limit_register;
            }

            if($cekContest==0)
            {
                $err['message'][] = 'Sorry, Contest has already started.';
            }

            if($total_entry_count >= $total_entry_max)
            {
                $err['message'][] = 'Sorry, cannot join Contest because reach limit registered team.';
            }

            if($user_entry_count >= $user_entry_max)
            {
                $err['message'][] = 'Sorry, cannot join Contest because reach maximum entry.';
            }

            if(!array_key_exists('message',$err))
            {
                $data = array(
                    'token' => $token
                );
                $this->output->set_output(json_encode($data), 200);
            }else{
                $this->output->set_output(json_encode(array('error'=>$err)), 200);http_response_code(400);
            }

        } else {
            $userid = '';

            $this->load->model('mdl_draft');
            $err = array();
            $cekContest = $this->mdl_draft->check_contest_start($contest_id);
            //$cekCount = $this->mdl_draft->check_contest_count($contest_id,$userid);

            //foreach ($cekCount->result() as $row) {
              //  $total_entry_count = $row->number_of_total_entry;
                //$total_entry_max = $row->entry_max;
            //}

            if($cekContest==0)
            {
                $err['message'][] = 'Sorry, Contest has already started.';
            }

            //if($total_entry_count >= $total_entry_max)
            //{
              //  $err['message'][] = 'Sorry, cannot join Contest because reach limit registered team.';
            //}

            if(!array_key_exists('message',$err))
            {
            }else{
                $this->output->set_output(json_encode(array('error'=>$err)), 200);http_response_code(400);
            }
        }

    }

    function checkingcontest($contest_id)
    {
        $cektoken = $this->cekToken($this->input->request_headers());

        if($cektoken) {
            $userid = $cektoken['userid'];
            $token = $this->generate_token($cektoken['userid'],$cektoken['username']);
        } else {
            $user_entry_count = '-';
            $token = '';
        }

        if(isset($userid))
        {
            $this->load->model('mdl_draft');
            $err = array();
            $cekContest = $this->mdl_draft->check_contest_start($contest_id);
            $cekCount = $this->mdl_draft->check_contest_count($contest_id,$userid);
            foreach ($cekCount->result() as $row) {
                $total_entry_count = $row->number_of_total_entry;
                $user_entry_count = $row->number_of_user_entry;
                $total_entry_max = $row->entry_max;
                $user_entry_max= $row->entry_limit_register;
            }

            if($cekContest==0)
            {
                $err['message'][] = 'Sorry, Contest has already started.';
            }

            if(!array_key_exists('message',$err))
            {
                $data = array(
                    'token' => $token
                );
                $this->output->set_output(json_encode($data), 200);
            }else{
                $this->output->set_output(json_encode(array('error'=>$err)), 200);http_response_code(400);
            }

        } else {
            $userid = '';

            $this->load->model('mdl_draft');
            $err = array();
            $cekContest = $this->mdl_draft->check_contest_start($contest_id);
            //$cekCount = $this->mdl_draft->check_contest_count($contest_id,$userid);

            //foreach ($cekCount->result() as $row) {
              //  $total_entry_count = $row->number_of_total_entry;
                //$total_entry_max = $row->entry_max;
            //}

            if($cekContest==0)
            {
                $err['message'][] = 'Sorry, Contest has already started.';
            }

            //if($total_entry_count >= $total_entry_max)
            //{
              //  $err['message'][] = 'Sorry, cannot join Contest because reach limit registered team.';
            //}

            if(!array_key_exists('message',$err))
            {
            }else{
                $this->output->set_output(json_encode(array('error'=>$err)), 200);http_response_code(400);
            }
        }

    }

    function generate_token($userid,$username) {
      $this->load->library('jwt');
          $tokenId    = base64_encode(mcrypt_create_iv(32));
          $issuedAt   = time();
          $notBefore  = $issuedAt;             //Adding 10 seconds
          $expire     = $notBefore + 10800;            // Adding 60 seconds
          $serverName = $this->input->server('SERVER_NAME'); // Retrieve the server name from config file

          /*
           * Create the token as an array
           */
          $data = [
                  'iat'  => $issuedAt,         // Issued at: time when the token was generated
                  'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
                  'iss'  => $serverName,       // Issuer
                  'nbf'  => $notBefore,        // Not before
                  'exp'  => $expire,           // Expire
                  'data' => [                  // Data related to the signer user
                          'userid'   => $userid, // userid from the users table
              'username' => $username,
                  ]
          ];
          $key = base64_encode('dailysportboss');
          $jwt = $this->jwt->encode($data, $key,'HS256');
          return $jwt;
      }

    function decode_token($jwt) {
          $this->load->library('jwt');
          $key = base64_encode('dailysportboss');
          $jwtdec = $this->jwt->decode($jwt, $key);
          return $jwtdec;
      }

}
